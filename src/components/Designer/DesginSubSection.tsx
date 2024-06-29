import React, { useState } from "react";
import GenericPaper from "../../common/Container/GenericPaper";
import { Box, Divider, Typography } from "@mui/material";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import Progress from "../../common/Progress/Progress";
import DesignContainer from "./DesignContainer";
import { useAssetById, useAssetInfoById } from "../../queries/useDesign";
import { useParams } from "react-router-dom";
import ButtonDisableUI from "../../common/Button/ButtonDisableUI";
import DesignDialog from "./DesignDialog";


const DesignSubSection: React.FC = () => {
    const params = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const {data, isLoading, remove, refetch} = useAssetById(params.id as string);
    const {data: info, isLoading: infoLoading} = useAssetInfoById(params.id as string);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);
    
    const handleSearch = (term: string) => {
        const searchTerm = term.trim().toLowerCase();
        setSearchTerm(searchTerm);
    };

    const reset = () => {
        remove();
        refetch();
    }

    return (
        <GenericPaper style={{borderRadius:'.375rem', width: '90vw', maxWidth: '1046px', minHeight: '100px', padding:'1.8em', boxShadow:'0'}}>
            <Box className="flex items-start place-content-between w-full">
                <BasicFrame isCentered={false} className="flex justify-between w-full">
                    <Typography style={{fontWeight:'500', fontSize:'1.1em'}}>Sub Assets</Typography>
                    <ButtonDisableUI onClick={handleOpen} disabled={infoLoading} text="Agregar"/>
                </BasicFrame>
            </Box>
            <Divider style={{marginBottom:'24px', paddingTop:'20px'}}/>
            {
                isLoading ? 
                <BasicFrame className="w-full" style={{height:'254px'}}>
                    <Progress/>
                </BasicFrame>
                : data && data.length > 0 ? 
                <BasicFrame isCentered={false} className="items-start flex-col">
                    <DesignContainer projects={data} searchTerm={searchTerm} onSearch={handleSearch} isLoading={isLoading} max_width="100%" isContent={false} activeDelete={true} reset={reset}/>
                </BasicFrame>
                : <Typography>No sub assets found</Typography>
            }
            {params && <DesignDialog onClose={handleClose} open={openDialog} dataProj={info}/>}
        </GenericPaper>
    );
}

export default DesignSubSection;