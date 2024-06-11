import Layout from "@/components/layout";
import Loaders from "@/components/loaders";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getConsultationHistory } from "@/utils/apis/list-clinics/api";
import { ConsultationHistoryType } from "@/utils/apis/list-clinics/types";
import { useEffect, useState } from "react";

const Consultation = () => {
  const [consultation, setConsultation] = useState<ConsultationHistoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  let no: number = 1;

  const getConsultation = async () => {
    try {
      const result = await getConsultationHistory();
      setConsultation(result.data);
      setLoading(false);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getConsultation();
  }, []);

  if (loading) {
    return <Loaders className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />;
  }

  return (
    <Layout>
      <div className="w-4/5 mx-auto my-10">
        <h1 className="text-2xl font-semibold">Consultation History</h1>
        <div className="my-5">
          {consultation && consultation != null ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consultation.map((data: ConsultationHistoryType, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{no++}</TableCell>
                      <TableCell>{data.doctor_details.full_name}</TableCell>
                      <TableCell>{data.service}</TableCell>
                      <TableCell>{data.scheduled_date}</TableCell>
                      <TableCell>{data.consultation_status}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col">
              <img src="/assets/data-not-dound.png" alt="consultation" className="mx-auto" />
              <h1>You dont have Consultation History</h1>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Consultation;
