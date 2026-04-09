import Image from "next/image";
import OrganizationImage from "@/public/images/organization-image-placeholder.webp";
import { Separator } from "@heroui/react";
import { IoIosArrowForward } from "react-icons/io";

function GeneralSettings() {
  return (
    <div className="flex flex-col w-full md:h-full md:justify-between space-y-4 md:overflow-hidden">
      <div className="border rounded-sm flex flex-col md:flex-row p-5 space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
        <div className="border rounded-lg flex items-center justify-center">
          <Image
            src={OrganizationImage}
            alt="OrganizationImage.png"
            className="w-28 h-20 md:w-35 md:h-35 rounded-xl"
          />
        </div>

        <div className="grid md:grid-cols-2 md:grid-rows-2 w-full gap-4">
          <InfoItem title={"Organisation"} />
          <InfoItem title={"Primary Email"} />
          <InfoItem title={"Address"} addSeparator={false} />
          <InfoItem title={"Primary Contact"} addSeparator={false} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:grid-rows-5 gap-x-7 gap-y-4">
        <InfoItem title={"Organization's ID"} />
        <InfoItem title={"Partner Bank"} />
        <InfoItem title={"Lincense Type"} />
        <InfoItem title={"Collection Account #"} />
        <InfoItem title={"Distribution Channel"} />
        <InfoItem title={"Payout Account #"} />
        <InfoItem title={"Country"} />
        <InfoItem title={"Operations Account #"} />
        <InfoItem title={"Default Language"} />
        <InfoItem title={"Default Currency"} />
      </div>
    </div>
  );
}

export default GeneralSettings;

const InfoItem = ({
  title,
  addSeparator = true,
}: {
  title: string;
  addSeparator?: boolean;
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-gotham-black">{title}</span>
          <span className="text-xs font-gotham-medium text-gray-500">N/A</span>
        </div>
        <IoIosArrowForward className="text-gray-400" />
      </div>
      {addSeparator && <Separator />}
    </div>
  );
};
