import { Card } from "@/components/card";
import Link from "next/link";

const Notifications = () => {
  return (
    <Card>
      <div>Notifications</div>
      <Link href={"/complex-dashboard/archived"}>Archived</Link>
    </Card>
  );
};

export default Notifications;
