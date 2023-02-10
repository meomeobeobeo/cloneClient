import React, { useState } from "react";
import TablePane from "../../components/TablePane/TablePane";
import styles from "./styles.module.scss";
import { columnsFromBackend } from "./kanbanData";
import clsx from "clsx";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { backlogSlice } from "../../redux/backlogSlice";
import { selectedSlice } from "../../redux/selectedSlice";
import { inprogressSlice } from "../../redux/inprogressSlice";
import { doneSlice } from "../../redux/doneSlice";

const BoardContent = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const dispath = useDispatch();

  // get data from store
  const backlogData = useSelector((state) => state.backlogIssues.backlogData);
  const doneData = useSelector((state) => state.doneIssues.doneData);
  const inprogressData = useSelector(
    (state) => state.inprogressIssues.inprogressData
  );
  const selectedData = useSelector(
    (state) => state.selectedIssues.selectedData
  );

  //

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "backlogData") {
        const data = [...backlogData]; // get data column

        const [removed] = data.splice(source.index, 1);
        data.splice(destination.index, 0, removed);
        dispath(backlogSlice.actions.updateIssues(data));
      } else if (source.droppableId === "selectedData") {
        const data = [...selectedData]; // get data column

        const [removed] = data.splice(source.index, 1);
        data.splice(destination.index, 0, removed);
        dispath(selectedSlice.actions.updateIssues(data));
      } else if (source.droppableId === "inprogressData") {
        const data = [...inprogressData]; // get data column

        const [removed] = data.splice(source.index, 1);
        data.splice(destination.index, 0, removed);
        dispath(inprogressSlice.actions.updateIssues(data));
      } else {
        const data = [...doneData]; // get data column

        const [removed] = data.splice(source.index, 1);
        data.splice(destination.index, 0, removed);
        dispath(doneSlice.actions.updateIssues(data));
      }
    }
    // # column
    else {
     const columns = {
      'backlogData':backlogData,
      'selectedData':selectedData,
      'inprogressData':inprogressData,
      'doneData':doneData
     }
     const sourceColumn = columns[source.droppableId];
     const destColumn = columns[destination.droppableId];
     
     const sourceItems = [...sourceColumn];
     const destItems = [...destColumn];
     const [removed] = sourceItems.splice(source.index, 1);
     destItems.splice(destination.index, 0, removed);
     const listSice = [backlogSlice , doneSlice , inprogressSlice , selectedSlice]
     listSice.forEach((slice) => {
      if(slice.name === source.droppableId){
        dispath(slice.actions.updateIssues(sourceItems))
      }
     })
     listSice.forEach((slice) => {
      if(slice.name === destination.droppableId){
        dispath(slice.actions.updateIssues(destItems))
      }
     })
     
     
      


    }

    
    
  };

  return (
    <DragDropContext
      onDragEnd={(result) => {
        //onDragEnd(result, columns, setColumns)
        onDragEnd(result);
      }}
    >
      <div className={clsx(styles.content)}>
        {/* {Object.entries(columns).map(([columnId, columnData], index) => {
          return (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <TablePane
                  snapshot = {snapshot}
                  provided={provided}
                  key={columnId}
                  items={columnData}
                />
              )}
            </Droppable>
          );
        })} */}
        <Droppable droppableId="backlogData">
          {(provided, snapshot) => (
            <TablePane
              title="BACKLOG"
              snapshot={snapshot}
              provided={provided}
              items={backlogData}
            />
          )}
        </Droppable>
        <Droppable droppableId="selectedData">
          {(provided, snapshot) => (
            <TablePane
              title="SELECTED FOR DEVELOPMENT"
              snapshot={snapshot}
              provided={provided}
              items={selectedData}
            />
          )}
        </Droppable>
        <Droppable droppableId="inprogressData">
          {(provided, snapshot) => (
            <TablePane
              title="IN PROGRESS"
              snapshot={snapshot}
              provided={provided}
              items={inprogressData}
            />
          )}
        </Droppable>
        <Droppable droppableId="doneData">
          {(provided, snapshot) => (
            <TablePane
              title="done"
              snapshot={snapshot}
              provided={provided}
              items={doneData}
            />
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default BoardContent;
