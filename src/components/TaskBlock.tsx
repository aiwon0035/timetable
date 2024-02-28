import DeleteTask from "./DeleteTask";

const TaskBlock = ({ uuid, id }: { uuid: string; id: string }) => {
  return (
    <div>
      <DeleteTask uuid={uuid} id={id} />
    </div>
  );
};

export default TaskBlock;
