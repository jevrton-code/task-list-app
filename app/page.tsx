import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { SquareCheck, Hash, Settings, Plus } from "lucide-react";

import TaskCard from "@/components/layout/TaskCard";

var MockTaskList: Array<React.ComponentProps<typeof TaskCard>> = [
  {
    task: {
      title: "Task 1",
      description: "Description for Task 1",
      done: false,
      tags: ["tag1", "tag2"],
    },
  },
  {
    task: {
      title: "Task 2",
      description: "Description for Task 2",
      done: false,
      tags: ["tag1", "tag2", "tag3"],
    },
  },
  {
    task: {
      title: "Task 3",
      description: "Description for Task 3",
      done: true,
      tags: ["tag1"],
    },
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">
        Welcome to the Simple Task List App
      </h1>
      <p className="mt-4 text-lg">Manage your tasks efficiently!</p>

      <Tabs defaultValue="tasks" className="w-[50%] mt-8">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SquareCheck /> Tasks
              </CardTitle>
              <CardAction>
                <Button variant="secondary" size="icon">
                  <Plus />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Separator />

              <div className="flex flex-col gap-4 mt-4">
                {MockTaskList.map((props, idx) => (
                  <TaskCard key={idx} {...props} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tags">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash /> Tags
              </CardTitle>
              <CardAction>
                <Button variant="secondary" size="icon">
                  <Plus />
                </Button>
              </CardAction>
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings /> Settings
              </CardTitle>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
