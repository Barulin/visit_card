import { IArrayElement } from '../interfaces/IArrayElement';

export function bubbleSort(array: IArrayElement[]) {
    let temp: IArrayElement;

    for (let i = array.length - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (array[j].value > array[j + 1].value) {
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
}
