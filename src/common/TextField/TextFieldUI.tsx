import { Box, TextField, Typography } from "@mui/material"
import { BasicFrame } from "../Frame/BasicFrame";

interface TextFieldUIProps {
    title: string ;
    defaultValue: string | undefined;
    multiline?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setObject: (object: any) => void;
    distance?: string;
    style?: React.CSSProperties;
}

const TextFieldUI: React.FC<TextFieldUIProps> = ({title, defaultValue, multiline=false, setObject, distance='7.2em', style}) => {
    return(
        <BasicFrame isCentered={false} className="items-start justify-start mb-4 flex flex-col sm:flex-row">
            <Typography style={{fontSize:'0.65em', fontWeight:'400', color:'#7d8fb1'}}>{title}</Typography>
            <Box className="flex"   sx={{
                marginLeft: {
                xs: 0,         // Para tamaños extra pequeños (teléfonos)
                sm: distance,         // Para tamaños pequeños (tablets)
                md: distance,  // Para tamaños medianos y mayores
                },
            }}>
                <TextField
                    fullWidth
                    type="text"
                    defaultValue={defaultValue}
                    multiline={multiline}
                    rows={4}  
                    onChange={(e) => setObject(e.target.value.trim())}
                    sx={{
                        
                        borderRadius: '.375rem',
                        '& .MuiOutlinedInput-root': {
                            padding: '0',
                          },
                        '& .MuiOutlinedInput-input': {
                            padding: '8px 12px',
                            width: '70vw',
                            maxWidth: '400px',
                        },
                        ...(style || {})
                    }}
                />
            </Box>
        </BasicFrame>
    )
}

export default TextFieldUI;