import { FC } from 'react';
import { ITask } from '../../../services/api/task.api.service';
import TaskItem from '../task-item/task-item.component';
import styles from './task-section.module.scss';
import { DragDropContext, DropResult, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import reorder from '../reorder';
import { useDispatch } from 'react-redux';
import { reorderTasks } from '../../../features/tasks/tasks.slice';

interface ITaskSectionProps {
  heading?: string | Date | React.ReactNode;
  tasks: ITask[];
  isDragDropDisabled?: boolean;
}

const TaskSection: FC<ITaskSectionProps> = ({ heading, tasks, isDragDropDisabled = false }) => {
  const dispatch = useDispatch();

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const updatedTasks = reorder(tasks, result.source.index, result.destination.index);

    dispatch(
      reorderTasks({
        updatedTasks,
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      }),
    );
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" isDropDisabled={isDragDropDisabled}>
        {(provided: DroppableProvided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className={styles.singleSection}>
              {heading && (
                <div className={styles.sectionContentTop}>
                  <h2>
                    <span>{heading}</span>
                  </h2>
                </div>
              )}
              <div className={styles.listHolder}>
                <ul className={styles.items}>
                  {tasks.map(
                    (task, index) =>
                      task && (
                        <li key={task.taskId}>
                          <TaskItem task={task} index={index} isDragDropDisabled={isDragDropDisabled} />
                        </li>
                      ),
                  )}
                </ul>
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskSection;
