import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { BACKEND_BASE_URL, IMAGE_BASE_URL } from "@/constants";
import { APPLICANT_URL } from "@/constants/apiUrlConstants";
import { useGetApiQuery, usePatchApiMutation } from "@/redux/services/crudApi";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { useEffect, useState } from "react";
import { RiSeoLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ViewApplicant({ id }: { id: number | null }) {
  const [status, setStatus] = useState<null | "selected" | "unselected">(null);

  const {
    data: applicantData,
    isSuccess: success,
    isLoading: loading,
  } = useGetApiQuery(`${APPLICANT_URL}${id}`, {
    skip: id === null || id === undefined,
  });

  const [patchApplicant] = usePatchApiMutation();

  useEffect(() => {
    if (!loading && success) {
      console.log(applicantData?.data?.status);
      setStatus(applicantData?.data?.status);
    }
  }, [success]);

  console.log(status);

  return (
    <div>
      {/* Tab Section */}
      <div className="flex mt-[4rem] mb-[1.5rem]">
        <p className="flex items-center gap-[6px] px-[20px] py-[8px] rounded-[0.25rem] bg-primaryColor text-white">
          <RiSeoLine />
          <p className="font-[500] text-[15px]">Applicant</p>
        </p>
      </div>
      {loading ? (
        <>Loading </>
      ) : (
        <div className="flex gap-[1.5rem] mb-[2.5rem]">
          <form className="grid grid-cols-1 gap-[1.5rem] w-full">
            <Input
              label="Name"
              type="text"
              value={applicantData?.data?.fullName}
              disabled
            />
            <Input
              label="Email"
              type="text"
              value={applicantData?.data?.email}
              disabled
            />
            <Input
              label="Career"
              type="text"
              value={applicantData?.data?.career?.title}
              disabled
            />
            <div className="flex flex-col">
              <label className="text-left" htmlFor="status">
                Status
              </label>
              <select
                className="p-3"
                onChange={async (e) => {
                  try {
                    const response = await patchApplicant({
                      url: `${APPLICANT_URL}${id}`,
                      body: { status: e.target.value },
                    }).unwrap();
                    handleResponse({
                      res: response,
                      onSuccess: () => {},
                    });
                    setStatus(e.target.value);
                  } catch (error) {
                    handleError({ error });
                  }
                }}
                value={status}
                name="status"
              >
                <option selected={!status} disabled value="">
                  choose an option
                </option>
                <option value="selected">selected</option>
                <option value="unselected">unselected</option>
              </select>
            </div>
            <Link
              className="underline text-blue-500"
              target="_blank"
              to={`${IMAGE_BASE_URL}${applicantData?.data?.cv_path}`}
            >
              Open CV
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}
