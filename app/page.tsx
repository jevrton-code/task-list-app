"use client";

import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multiselect";

const availableTags = [
  { value: "tag1", label: "Tag 1" },
  { value: "tag2", label: "Tag 2" },
  { value: "tag3", label: "Tag 3" },
  { value: "tag4", label: "Tag 4" },
];

export default function Home() {
  const [tasks, setTasks] = useState<
    Array<{
      task: {
        title: string;
        description: string;
        done: boolean;
        tags: string[];
      };
    }>
  >([]);
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Carrega tasks do localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // Função para resetar o form
  function resetForm() {
    setNewTitle("");
    setNewDescription("");
    setSelectedTags([]);
    setEditingIndex(null);
    setOpen(false);
  }

  // Salvar (criar ou editar)
  function handleSaveTask() {
    if (!newTitle.trim()) return;

    let updatedTasks;

    if (editingIndex !== null) {
      updatedTasks = [...tasks];
      updatedTasks[editingIndex] = {
        task: {
          title: newTitle,
          description: newDescription,
          done: tasks[editingIndex].task.done,
          tags: selectedTags,
        },
      };
    } else {
      updatedTasks = [
        ...tasks,
        {
          task: {
            title: newTitle,
            description: newDescription,
            done: false,
            tags: selectedTags,
          },
        },
      ];
    }

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    resetForm();
  }

  // Deletar
  function handleDeleteTask() {
    if (editingIndex === null) return;
    const updatedTasks = tasks.filter((_, idx) => idx !== editingIndex);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    resetForm();
  }

  // Abrir modal para editar
  function handleEditTask(index: number) {
    const task = tasks[index].task;
    setNewTitle(task.title);
    setNewDescription(task.description);
    setSelectedTags(task.tags);
    setEditingIndex(index);
    setOpen(true);
  }

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
                <Button
                  variant="secondary"
                  size="icon"
                  id="add-task-button"
                  onClick={() => setOpen(true)}
                >
                  <Plus />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Separator />

              <div className="flex flex-col gap-4 mt-4">
                {tasks.map((props, idx) => (
                  <TaskCard
                    key={idx}
                    {...props}
                    onEdit={() => handleEditTask(idx)}
                  />
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null ? "Edit Task" : "New Task"}
            </DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Task title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Textarea
            placeholder="Task description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <MultiSelect
            options={availableTags}
            value={selectedTags}
            onChange={setSelectedTags}
          />
          <DialogFooter>
            {editingIndex !== null && (
              <Button
                variant="destructive"
                onClick={handleDeleteTask}
                className="mr-auto"
              >
                Delete
              </Button>
            )}
            <Button onClick={handleSaveTask}>
              {editingIndex !== null ? "Save Changes" : "Save Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
