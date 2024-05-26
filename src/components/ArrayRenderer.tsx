import { ArrayElementStatus } from '../interfaces/ArrayElementStatus';
import { IArrayElement } from '../interfaces/IArrayElement';
import { Box, useTheme } from '@mui/material';

interface ArrayComponentProps {
    array: IArrayElement[];
}

const MIN_BAR_HEIGHT = 20;

export default function ArrayRenderer(props: ArrayComponentProps) {
    const { array } = props;
    const theme = useTheme();

    let maxValue = array[0]?.value;
    array.forEach((element) => {
        if (element.value > maxValue) {
            maxValue = element.value;
        }
    });

    return (
        <div className="arrayRenderer">
            {array.map((element) => {
                let color;
                switch (element.status) {
                    case ArrayElementStatus.COMPARED:
                        color = theme.palette.primary.dark;
                        break;
                    case ArrayElementStatus.CURRENT:
                        color = theme.palette.secondary.main;
                        break;
                    default:
                        color = theme.palette.primary.light;
                        break;
                }
                return (
                    <Box
                        key={element.id}
                        sx={{
                            bgcolor: color,
                            width: 40,
                            height:
                                MIN_BAR_HEIGHT +
                                (element.value / maxValue) * 200,
                            transition: 'all 0.5s',
                            mx: '4px',
                        }}
                    >
                        {element.value}
                    </Box>
                );
            })}
        </div>
    );
}
