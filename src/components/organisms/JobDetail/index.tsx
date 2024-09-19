import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PartyPopperIcon } from "lucide-react";
import React, { FC } from "react";
import { CategoryJob, Job } from "@prisma/client";
import { dateFormat } from "../../../lib/utils";

type JobDetailType = {
  CategoryJob: CategoryJob | null;
} & Job;

interface JobDetailProps {
  detail: JobDetailType | null;
}

const JobDetail: FC<JobDetailProps> = ({ detail }) => {
  const benefits: any = detail?.benefits;
  return (
    <div>
      <div className="grid grid-cols-3 w-full gap-5">
        <div className="col-span-2 space-y-10">
          <div>
            <div className="text-3xl font-semibold">Descriptions</div>
            <div className="text-gray-500 mt-3" dangerouslySetInnerHTML={{ __html: detail?.description!! }}></div>
          </div>
          <div>
            <div className="text-3xl font-semibold">Responsibilities</div>
            <div className="text-gray-500 mt-3" dangerouslySetInnerHTML={{ __html: detail?.responsibility!! }}></div>
          </div>
          <div>
            <div className="text-3xl font-semibold">Who Your Are</div>
            <div className="text-gray-500 mt-3" dangerouslySetInnerHTML={{ __html: detail?.whoYouAre!! }}></div>
          </div>
          <div>
            <div className="text-3xl font-semibold">Nice To Haves</div>
            <div className="text-gray-500 mt-3" dangerouslySetInnerHTML={{ __html: detail?.niceToHaves!! }}></div>
          </div>
        </div>
        <div>
          <div className="text-3xl font-semibold">About This Job</div>
          <div className="shadow p-3 text-center my-6">
            {detail?.applicants} <span className="text-slate-500">of {detail?.needs} capacity</span>
            <Progress className="mt-3" value={(detail?.applicants || 0) / (detail?.needs || 0) / 100} />
          </div>
          <div className="mb-10 space-y-5">
            <div className="flex justify-between">
              <div className="text-slate-600"> Apply Before</div>
              <div className="font-semibold"> {dateFormat(detail?.dueDate)}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-slate-600"> Job Posted on</div>
              <div className="font-semibold"> {dateFormat(detail?.datePosted)}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-slate-600"> Job Type</div>
              <div className="font-semibold"> {detail?.jobType}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-slate-600"> Salary</div>
              <div className="font-semibold">
                {" "}
                {detail?.salaryFrom} - {detail?.salaryTo}
              </div>
            </div>

            <Separator />
            <div className="my-10">
              <div className="text-3xl font-semibold mb-4">Category</div>
              <div className="space-x-5">
                <Badge>{detail?.CategoryJob?.name}</Badge>
              </div>
            </div>

            <Separator />
            <div className="my-10">
              <div className="text-3xl font-semibold mb-4">Required Skills</div>
              <div className="space-x-5">
                {detail?.requiredSkills.map((item: string, i: number) => (
                  <Badge variant={"outline"} key={i}>
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />
      <div>
        <div className="text-3xl font-semibold ">Perks & Benefits</div>
        <div className="text-slate-500"> This job comes with several perks and benefits</div>
        <div className="grid grid-cols-4 gap-5 mt-9">
          {benefits?.map((item: any) => (
            <div key={item}>
              <PartyPopperIcon className="w-7 h-7 mb-5 text-primary" />
              <div className="text-lg font-semibold mb-3">{item.benefit}</div>
              <div className="text-slate-500">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default JobDetail;
