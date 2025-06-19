import React, { useState } from 'react';
import { Box, Paper, Typography, IconButton, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from '@hello-pangea/dnd';

interface Card {
    id: string;
    title: string;
}

interface Column {
    id: string;
    title: string;
    cards: Card[];
}

const initialColumns: Column[] = [
    { id: '1', title: 'À faire', cards: [] },
    { id: '2', title: 'En cours', cards: [] },
    { id: '3', title: 'Terminé', cards: [] },
];

export default function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const [editingCardId, setEditingCardId] = useState<string | null>(null);
    const [editedTitle, setEditedTitle] = useState('');

    const handleAddCard = (columnId: string) => {
        const title = prompt('Titre de la nouvelle carte ?');
        if (!title) return;
        const newCard = { id: Date.now().toString(), title };
        setColumns(prev =>
            prev.map(col =>
                col.id === columnId
                    ? { ...col, cards: [...col.cards, newCard] }
                    : col
            )
        );
    };

    const handleCardClick = (card: Card) => {
        setEditingCardId(card.id);
        setEditedTitle(card.title);
    };

    const handleCardEdit = (colId: string, cardId: string) => {
        setColumns(prev =>
            prev.map(col =>
                col.id === colId
                    ? {
                        ...col,
                        cards: col.cards.map(card =>
                            card.id === cardId ? { ...card, title: editedTitle } : card
                        ),
                    }
                    : col
            )
        );
        setEditingCardId(null);
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceCol = columns.find(col => col.id === source.droppableId);
        const destCol = columns.find(col => col.id === destination.droppableId);
        if (!sourceCol || !destCol) return;

        const draggedCard = sourceCol.cards[source.index];

        if (sourceCol === destCol) {
            const newCards = Array.from(sourceCol.cards);
            newCards.splice(source.index, 1);
            newCards.splice(destination.index, 0, draggedCard);
            setColumns(columns.map(col =>
                col.id === sourceCol.id ? { ...col, cards: newCards } : col
            ));
        } else {
            const sourceCards = Array.from(sourceCol.cards);
            const destCards = Array.from(destCol.cards);
            sourceCards.splice(source.index, 1);
            destCards.splice(destination.index, 0, draggedCard);

            setColumns(columns.map(col => {
                if (col.id === sourceCol.id) return { ...col, cards: sourceCards };
                if (col.id === destCol.id) return { ...col, cards: destCards };
                return col;
            }));
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    p: 2,
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                }}
            >
                {columns.map(column => (
                    <Paper
                        key={column.id}
                        sx={{
                            width: 300,
                            p: 2,
                            flexShrink: 0,
                            display: 'inline-block',
                            backgroundColor: '#fafafa',
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6">{column.title}</Typography>
                            <IconButton onClick={() => handleAddCard(column.id)} size="small">
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Droppable droppableId={column.id}>
                            {(provided) => (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    sx={{ minHeight: 50 }}
                                >
                                    {column.cards.map((card, index) => (
                                        <Draggable key={card.id} draggableId={card.id} index={index}>
                                            {(provided) => (
                                                <Box
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    sx={{
                                                        mb: 1,
                                                        p: 1,
                                                        background: '#f4f4f4',
                                                        borderRadius: 1,
                                                    }}
                                                >
                                                    {editingCardId === card.id ? (
                                                        <Box
                                                            component="form"
                                                            onSubmit={e => {
                                                                e.preventDefault();
                                                                handleCardEdit(column.id, card.id);
                                                            }}
                                                        >
                                                            <TextField
                                                                size="small"
                                                                value={editedTitle}
                                                                onChange={e => setEditedTitle(e.target.value)}
                                                                autoFocus
                                                            />
                                                            <Button type="submit" size="small" sx={{ ml: 1 }}>
                                                                OK
                                                            </Button>
                                                        </Box>
                                                    ) : (
                                                        <Typography
                                                            variant="body2"
                                                            onClick={() => handleCardClick(card)}
                                                            sx={{ cursor: 'pointer' }}
                                                        >
                                                            {card.title}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Box>
                            )}
                        </Droppable>
                    </Paper>
                ))}
            </Box>
        </DragDropContext>
    );
}
