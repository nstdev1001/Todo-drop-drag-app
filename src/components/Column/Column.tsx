import Task from "../Task/Task";
import "./Column.css";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Column = ({ task }: any) => {
  return (
    <div className="column">
      <SortableContext items={task} strategy={verticalListSortingStrategy}>
        {task.map((task: any) => (
          <Task id={task.id} title={task.title} key={task.id} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
