import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { SquarePen } from "lucide-react";
import { Switch } from "../ui/switch";

import { ITask } from "@/infra/models/TaskModel";
import { Badge } from "../ui/badge";

interface TaskProps {
  task: ITask;
}

const TaskCard: React.FC<TaskProps> = ({ task }) => (
  <Card>
    <CardHeader>
      <CardTitle>{task.title}</CardTitle>
      <CardDescription>{task.description}</CardDescription>
      <CardAction className="flex gap-2 items-center">
        <Switch checked={task.done} />
        <Button variant="secondary" size="icon">
          <SquarePen />
        </Button>
      </CardAction>
    </CardHeader>
    <CardFooter>
      <div className="flex flex-wrap gap-2">
        {task.tags.map((tag, idx) => (
          <Badge key={idx} variant="secondary" className="bg-blue-500 text-white">
            {tag}
          </Badge>
        ))}
      </div>
    </CardFooter>
  </Card>
);

export default TaskCard;
