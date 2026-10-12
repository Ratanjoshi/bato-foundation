import {
  FlaskConical,
  Lightbulb,
  Wrench,
  Share2,
  Users,
  BookOpen,
  Globe,
  Heart,
  Target,
  Sparkles,
  Zap,
  Award,
  Handshake,
  GraduationCap,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  FlaskConical,
  Lightbulb,
  Wrench,
  Share2,
  Users,
  BookOpen,
  Globe,
  Heart,
  Target,
  Sparkles,
  Zap,
  Award,
  Handshake,
  GraduationCap,
  Rocket,
};

interface Props {
  value: string;
  onChange: (name: string) => void;
}

const IconPicker = ({ value, onChange }: Props) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2 p-3 border rounded-lg bg-white max-h-72 overflow-y-auto">
      {Object.entries(ICONS).map(([name, Icon]) => {
        const selected = value === name;
        return (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            title={name}
            className={`flex flex-col items-center justify-center gap-1 rounded-lg border p-3 transition ${
              selected
                ? "bg-primaryColor text-white border-primaryColor"
                : "bg-white text-gray-700 border-gray-200 hover:border-primaryColor hover:text-primaryColor"
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] truncate w-full text-center">
              {name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default IconPicker;
