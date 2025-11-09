import Link from "next/link";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const metrics = [
  {
    label: "Active clinics",
    value: "48",
    change: "+3 this week",
  },
  {
    label: "Chairs in use",
    value: "312",
    change: "82% capacity",
  },
  {
    label: "Pending approvals",
    value: "12",
    change: "4 require attention",
  },
];

const appointments = [
  {
    id: "APT-9821",
    patient: "Maria Lopez",
    clinic: "Central Dental",
    time: "Today · 2:30 PM",
    status: "Confirmed",
  },
  {
    id: "APT-9812",
    patient: "Derrick Howard",
    clinic: "Lakeside Smiles",
    time: "Today · 4:00 PM",
    status: "Awaiting X-ray",
  },
  {
    id: "APT-9804",
    patient: "Layla Carter",
    clinic: "Uptown Kids Dental",
    time: "Tomorrow · 9:15 AM",
    status: "Follow-up",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <Badge className="w-fit bg-primary/20 text-primary">
              Network control
            </Badge>
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Super admin overview
              </h1>
              <p className="text-base text-muted-foreground">
                Stay ahead of clinic operations, staffing, and compliance across
                the entire dental network.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="border-primary/40 text-primary"
            >
              Export report
            </Button>
            <Button>New broadcast</Button>
            <Avatar
              fallback="SA"
              className="h-11 w-11 border border-primary/40"
            />
          </div>
        </header>

        <Card className="border border-border/60 bg-card/70 backdrop-blur">
          <CardContent className="grid gap-6 p-6 md:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-border/40 bg-background/40 p-5 shadow-inner shadow-primary/5"
              >
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold text-foreground">
                  {metric.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wide text-primary">
                  {metric.change}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <Card className="border border-border/60 bg-card/70">
                <CardHeader>
                  <CardTitle>Network health</CardTitle>
                  <CardDescription>
                    Real-time signals from every clinic.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Operational readiness</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg bg-background/40 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Staff coverage
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Across all departments
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-primary/40 text-primary"
                      >
                        97%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-background/40 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Inventory balance
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Critical supplies stocked
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-primary/40 text-primary"
                      >
                        Stable
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/60 bg-card/70">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle>Escalations</CardTitle>
                    <CardDescription>
                      Clinic alerts requiring review.
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-primary hover:bg-primary/10"
                  >
                    View all
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border border-border/40 bg-background/40 p-4">
                    <p className="text-sm font-medium text-foreground">
                      Regulatory audit pending
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Downtown Dental · respond by Friday
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-background/40 p-4">
                    <p className="text-sm font-medium text-foreground">
                      Equipment outage reported
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Seaside Implants · chair 5 offline
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-background/40 p-4">
                    <p className="text-sm font-medium text-foreground">
                      Billing discrepancies
                    </p>
                    <p className="text-xs text-muted-foreground">
                      North Ridge Pediatrics · 6 claims flagged
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card className="border border-border/60 bg-card/70">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Today&apos;s spotlight</CardTitle>
                  <CardDescription>
                    High priority visits across the network.
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="border-primary/40 text-primary"
                >
                  Sync calendars
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex flex-col gap-2 rounded-lg border border-border/40 bg-background/40 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {appointment.patient}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {appointment.clinic}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground md:text-sm">
                      {appointment.time}
                    </div>
                    <Badge
                      variant="outline"
                      className="border-primary/40 text-primary"
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Looking for more detail?</span>
                <Link href="#" className="text-primary hover:underline">
                  Jump to scheduling suite
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border border-border/60 bg-card/70">
                <CardHeader>
                  <CardTitle>Revenue performance</CardTitle>
                  <CardDescription>Rolling 30 day view.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Network goal</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Collections</span>
                      <span>74%</span>
                    </div>
                    <Progress value={74} className="bg-muted" />
                  </div>
                  <Separator className="bg-border/60" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Top performing clinic</span>
                    <Badge
                      variant="outline"
                      className="border-primary/40 text-primary"
                    >
                      Harbor Dental · 118%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/60 bg-card/70">
                <CardHeader>
                  <CardTitle>Experience metrics</CardTitle>
                  <CardDescription>
                    Patient feedback across markets.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Satisfaction index
                    </p>
                    <p className="text-3xl font-semibold text-foreground">
                      4.7 / 5
                    </p>
                    <p className="text-xs text-primary">+0.3 vs last month</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Average wait time</span>
                      <span>11 min</span>
                    </div>
                    <Progress value={80} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Same day acceptance</span>
                      <span>61%</span>
                    </div>
                    <Progress value={61} />
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full text-primary hover:bg-primary/10"
                  >
                    View survey transcripts
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
