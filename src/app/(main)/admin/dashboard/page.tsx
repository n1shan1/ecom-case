import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { formatPrice } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import StatusDropDown from "../_components/status-dropdown";

type Props = {};

async function DashboardPage({}: Props) {
  const user = await currentUser();
  if (!user || !user.id || !user.emailAddresses[0]?.emailAddress) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-muted/40">
        <h1 className="text-2xl font-bold">
          You are not authorized to view this page.
        </h1>
      </div>
    );
  }
  if (user?.emailAddresses[0]?.emailAddress !== process.env.ADMIN_EMAIL) {
    return notFound();
  }

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      billingAddress: true,
      shippingAddress: true,
      configuration: true,
    },
  });

  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
      },
    },
    _sum: {
      amount: true,
    },
  });
  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        // Last 7 Days
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const MONTHLY_GOAL = 10000;
  const WEEKLY_GOAL = 2500;
  return (
    <div className="flex min-h-screen w-full bg-muted/40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full mx-auto flex flex-col m:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          <p className="mt-10 text-xl sm:text-3xl lg:text-5xl font-bold">
            Goals and Stats
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Month</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastMonthSum._sum.amount || 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-base text-muted-foreground">
                  of {MONTHLY_GOAL} goal.
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={
                    ((lastMonthSum._sum.amount || 0) * 100) / MONTHLY_GOAL || 0
                  }
                  max={MONTHLY_GOAL}
                />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Week</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastWeekSum._sum.amount || 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-base text-muted-foreground">
                  of {WEEKLY_GOAL} goal.
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={
                    ((lastWeekSum._sum.amount || 0) * 100) / WEEKLY_GOAL || 0
                  }
                  max={WEEKLY_GOAL}
                />
              </CardFooter>
            </Card>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Incoming Orders</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Order Date
                </TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">
                      {order.shippingAddress?.name}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.user.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StatusDropDown id={order.id} orderStatus={order.status} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(order.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
