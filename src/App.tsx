import { Fragment, useState } from "react";
import "normalize.css";
import "./App.css";
import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { PointerSensor, TouchSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./components/Column/Column";
import Input from "./components/input/Input";

export interface Todo {
  id: number;
  title: string;
}

function App() {
  const [tasks, setTasks] = useState<Todo[]>([
    { id: 1, title: "Doing homework" },
    { id: 2, title: "Learning react" },
    { id: 3, title: "Learning english" },
  ]);

  const addTask = (title: string) => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
  };

  const getTaskPos = (id: number) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  console.log("task: ", tasks);

  return (
    <Fragment>
      <div className="App">
        <h1>Todo drop-drag app</h1>
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <Input onSubmit={addTask} />
          <Column task={tasks} />
        </DndContext>
      </div>
    </Fragment>
  );
}

export default App;
