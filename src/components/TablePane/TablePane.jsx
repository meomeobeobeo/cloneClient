import clsx from "clsx";
import React from "react";
import {Draggable} from "react-beautiful-dnd";
import Issue from "../issue/Issue";
import styles from "./styles.module.scss";

const TablePane = ({
                       width,
                       height,
                       items,
                       ref,
                       provided,
                       snapshot,
                       title,
                   }) => {
    return (
        <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={clsx(styles.body)}
        >
            <div className={styles.title}>{title}</div>
            <div
                className={clsx(styles.content, {
                    "bg-blue-200": snapshot.isDraggingOver,
                })}
            >
                {items.map((item, index) => {
                    return (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(providedChild, snapshot) => {
                                return (
                                    <div
                                        ref={providedChild.innerRef}
                                        {...providedChild.draggableProps}
                                        {...providedChild.dragHandleProps}
                                    >
                                        <Issue id={item.id} snapshot={snapshot} item={item}/>
                                    </div>
                                );
                            }}
                        </Draggable>
                    );
                })}
                {provided.placeholder}
            </div>
        </div>
    );
};

export default React.memo(TablePane);
