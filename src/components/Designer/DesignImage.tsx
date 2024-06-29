import { useParams } from "react-router-dom";
import GenericPaper from "../../common/Container/GenericPaper";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import Progress from "../../common/Progress/Progress";
import { useAssetInfoById } from "../../queries/useDesign";
import DesignImageList from "./DesignImageList";
import { Box, Divider, Typography } from "@mui/material";
import ButtonDisableUI from "../../common/Button/ButtonDisableUI";
import { useState } from "react";
import DesignDialogImage from "./DesignDialogImage";

const DesignImage: React.FC = () => {
    const params = useParams();
    const [openDialog, setOpenDialog] = useState(false);
    const {isLoading, data, remove, refetch} = useAssetInfoById(params.id as string);
    
    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    const reset = () => {
        remove();
        refetch();
    }
    return (
        <GenericPaper style={{borderRadius:'.375rem', width: '90vw', maxWidth: '1046px', minHeight: '100px', padding:'1.8em', boxShadow:'0'}}>
            <Box className=" flex items-start place-content-between">
            <BasicFrame isCentered={false} className="flex justify-between w-full">
                <Typography style={{fontWeight:'500', fontSize:'1.1em'}}>Images</Typography>
                <ButtonDisableUI onClick={handleOpen} text="Agregar"/>
            </BasicFrame>
            </Box>
            <Divider style={{marginBottom:'24px', paddingTop:'20px'}}/>
            {
                isLoading ? 
                <BasicFrame className="w-full" style={{height:'254px'}}>
                    <Progress/>
                </BasicFrame>
                :
                <BasicFrame isCentered={false} className="items-start flex-col">
                {
                    isLoading ? 
                    <BasicFrame className="w-full" style={{height:'254px'}}>
                        <Progress/>
                    </BasicFrame>
                    : data && data.images.length > 0 ? 
                    <BasicFrame isCentered={false} className="card-container items-start justify-between w-full">
                        <BasicFrame isCentered={false} className="flex flex-col" style={{height: '530px', width: '100%'}}>
                            <GenericPaper className="mt-4" style={{padding:'0.5em', height: '100%'}}>
                                <DesignImageList images={data!.images} design={data} remove={reset}/>
                            </GenericPaper>
                        </BasicFrame>
                    </BasicFrame>
                    : <Typography>No image found</Typography>
                }
                </BasicFrame>
            }
            {params && <DesignDialogImage onClose={handleClose} open={openDialog} dataProj={data}/>}
        </GenericPaper>
    );
}

export default DesignImage;


