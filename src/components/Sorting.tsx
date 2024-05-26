import { Button, ButtonGroup, TextField } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { bubbleSort } from '../utils/bubble-sort';
import { IArrayElement } from '../interfaces/IArrayElement';
import ArrayRenderer from './ArrayRenderer';
import { ArrayElementStatus } from '../interfaces/ArrayElementStatus';

const MAX_ARRAY_LENGTH = 10;
const DEFAULT_NOTIFICATION = 'Type some number or generate random array.';

export default function Sorting() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [array, setArray] = useState<IArrayElement[]>([]);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [notification, setNotification] =
        useState<string>(DEFAULT_NOTIFICATION);
    const [inputError, setInputError] = useState<string>('');
    const idTracker = useRef(0);

    useEffect(() => {
        if (array.length > 0) {
            setNotification('');
        } else {
            setNotification(DEFAULT_NOTIFICATION);
        }
    }, [array]);

    const onInputFocus = () => {
        setInputError('');
    };

    const onAddClick = useCallback(() => {
        const value = Math.round(Number(inputRef?.current?.value));
        if (value <= 0 || value > 100) {
            setInputError('Please add value between 1 and 100');
            return;
        }

        setArray([
            ...array,
            {
                id: idTracker.current++,
                value,
                status: ArrayElementStatus.DEFAULT,
            },
        ]);
    }, [array]);

    const onClearClick = useCallback(() => {
        setArray([]);
        idTracker.current = 0;
    }, []);

    const onGenerateRandomClick = () => {
        idTracker.current = 0;

        const newArray = Array.from(Array(MAX_ARRAY_LENGTH), () => {
            return {
                id: idTracker.current++,
                value: Math.round(1 + Math.random() * 99),
                status: ArrayElementStatus.DEFAULT,
            };
        });

        setArray(newArray);
    };

    const onSortClick = useCallback(async () => {
        // 1st approach - sync
        setIsDisabled(true);
        const newArray = [...array];
        bubbleSort(newArray);
        setArray(newArray);
        setIsDisabled(false);
    }, [array]);

    return (
        <div>
            <TextField
                inputRef={inputRef}
                disabled={isDisabled}
                error={!!inputError}
                helperText={inputError}
                onFocus={onInputFocus}
                type="number"
                variant="standard"
                defaultValue={1}
                inputProps={{ min: 1, max: 100 }}
                sx={{ width: 220 }}
            />
            <Button
                onClick={onAddClick}
                disabled={isDisabled || array.length === MAX_ARRAY_LENGTH}
                variant="outlined"
                sx={{ ml: 2 }}
            >
                Add
            </Button>

            <div>
                <ButtonGroup sx={{ my: 2 }}>
                    <Button
                        onClick={onGenerateRandomClick}
                        disabled={isDisabled}
                        variant="outlined"
                        color="error"
                    >
                        Generate random
                    </Button>
                    <Button
                        onClick={onClearClick}
                        disabled={isDisabled}
                        variant="outlined"
                        color="warning"
                    >
                        Clear
                    </Button>
                    <Button
                        onClick={onSortClick}
                        disabled={isDisabled}
                        variant="contained"
                        color="primary"
                    >
                        Sort
                    </Button>
                </ButtonGroup>
            </div>

            <p>{notification}</p>

            <ArrayRenderer array={array} />
        </div>
    );
}
