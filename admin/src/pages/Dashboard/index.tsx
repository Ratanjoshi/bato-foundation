import PageContent from "@/components/PageContent";
import { checkViewAccessList } from "@/utils/accessHelper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Mail,
  Settings,
  Phone,
  Users,
  FileText,
  ImageIcon,
  Activity,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAppSelector } from "@/redux/store/hooks";
import {
  BANNER_LIST_ROUTE,
  BLOG_LIST_ROUTE,
  CONTACT_LIST_ROUTE,
  EMAIL_TEMPLATE_LIST_ROUTE,
  SEO_LIST_ROUTE,
  SETTINGS_ROUTE,
  SUBSCRIBERS_LIST_ROUTE,
} from "@/routes/routeNames";
import { useGetApiQuery } from "@/redux/services/crudApi";
import { CONTACT_URL } from "@/constants/apiUrlConstants";

const quickLinks = [
  {
    title: "Banner",
    description: "Manage website banners",
    icon: ImageIcon,
    color: "bg-purple-500",
    href: BANNER_LIST_ROUTE,
    accessKey: "Banner",
  },
  {
    title: "SEO",
    description: "Search optmization",
    icon: Search,
    color: "bg-orange-500",
    href: SEO_LIST_ROUTE,
    accessKey: "SEO",
  },
  {
    title: "Email Templates",
    description: "Email management",
    icon: Mail,
    color: "bg-blue-500",
    href: EMAIL_TEMPLATE_LIST_ROUTE,
    accessKey: "Email Template",
  },
  {
    title: "Settings",
    description: "System configuration",
    icon: Settings,
    color: "bg-gray-500",
    href: SETTINGS_ROUTE,
    accessKey: "Company Settings",
  },
  {
    title: "Contact Inquiry",
    description: "Customer inquiries",
    icon: Phone,
    color: "bg-green-500",
    href: CONTACT_LIST_ROUTE,
    accessKey: "Contact",
  },
  {
    title: "Subscribers",
    description: "Newsletter subscribers",
    icon: Users,
    color: "bg-indigo-500",
    href: SUBSCRIBERS_LIST_ROUTE,
    accessKey: "Subscriber",
  },
  {
    title: "Blogs",
    description: "Content management",
    icon: FileText,
    color: "bg-red-500",
    href: BLOG_LIST_ROUTE,
    accessKey: "Blog",
  },
];

export default function Dashboard() {
  const viewAccess = checkViewAccessList();
  const navigate = useNavigate();
  const { data: allContact } = useGetApiQuery(`${CONTACT_URL}list`);

  // Get username from auth state
  const username = useAppSelector((state) => state.auth.username);

  // Filter links based on access permissions
  const accessibleLinks = quickLinks.filter((link) =>
    viewAccess.includes(link.accessKey),
  );

  return (
    <PageContent>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Welcome Section */}
        <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white text-start">
          <h1 className="text-[2.5rem] font-bold capitalize">
            Welcome back, {username ? username : "Admin"}!
          </h1>
          <p className="text-blue-100 mt-2 text-[1.5rem]">
            Here's what's happening with your system today.
          </p>
        </div>

        {/* Recent Contacts Section */}
        {viewAccess.includes("Contact") &&
          allContact?.data?.data?.length > 0 && (
            <div>
              <h2 className="text-[2rem] font-bold mb-6 text-start">
                Recent Contacts
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[1.5rem]">
                    <Activity className="h-7 w-7" />
                    Latest Contact Inquiries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-[1fr,2fr] gap-4 p-3 bg-gray-50 rounded font-semibold text-[1.1rem]">
                      <div>Full Name</div>
                      <div>Email</div>
                    </div>
                    {allContact?.data?.data?.slice(0, 5).map(
                      (
                        {
                          full_name,
                          email,
                        }: {
                          full_name: string;
                          email: string;
                        },
                        index: number,
                      ) => (
                        <Link
                          key={index}
                          className="grid grid-cols-[1fr,2fr] gap-4 p-3 hover:bg-gray-50 rounded transition-colors text-[1rem]"
                          to={CONTACT_LIST_ROUTE}
                        >
                          <div className="truncate">{full_name}</div>
                          <div className="truncate text-blue-600">{email}</div>
                        </Link>
                      ),
                    )}
                  </div>
                  <div className="mt-6 pt-4 border-t">
                    <Link
                      to={CONTACT_LIST_ROUTE}
                      className="text-blue-600 hover:text-blue-800 font-medium text-[1.1rem]"
                    >
                      View all contacts →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        {/* Quick Links Grid */}
        <div>
          <h2 className="text-[2rem] font-bold mb-6 text-start">Quick Links</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {accessibleLinks.map((link) => (
              <Card
                key={link.title}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={() => navigate(link.href)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-[1.3rem] font-semibold">
                    {link.title}
                  </CardTitle>
                  <div className={`p-3 rounded-full ${link.color}`}>
                    <link.icon className="h-7 w-7 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[1rem] text-muted-foreground mb-3">
                    {link.description}
                  </p>
                  <div className="text-right">
                    <span className="text-blue-600 text-[1rem] font-medium">
                      Manage →
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageContent>
  );
}
