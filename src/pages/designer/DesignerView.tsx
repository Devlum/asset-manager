import React, { Fragment, useState } from "react";
import { GenericFrame } from "../../common/Frame/GenericFrame";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import { Typography } from "@mui/material";
import { useAssets } from "../../queries/useDesign";
import Progress from "../../common/Progress/Progress";
import NotFound from "../not_found/NotFound";
import DesignContainer from "../../components/Designer/DesignContainer";
import ButtonDisableUI from "../../common/Button/ButtonDisableUI";
import DesignDialog from "../../components/Designer/DesignDialog";

const DesigView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const {isLoading, data} = useAssets();
    
    const handleSearch = (term: string) => {
        const searchTerm = term.trim().toLowerCase();
        setSearchTerm(searchTerm);
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    
    return (
        <Fragment>
        { isLoading ? 
            (<GenericFrame>
                <Progress/> 
            </GenericFrame>)
            : data && data.length > 0 ? 
            (
                <GenericFrame isCentered={false} className="items-start justify-center">
                <BasicFrame isCentered={false} className="mt-10" style={{flexDirection:'column'}}>
                    <BasicFrame isCentered={false} className="flex justify-between pb-4" style={{width: '90vw', maxWidth: '860px'}}>
                        <Typography style={{ fontSize: '1.3em'}}>Diseñador de<span style={{fontWeight: 'bold'}}> Assets</span></Typography>
                        <ButtonDisableUI width="150px" onClick={handleOpen} text="Agregar asset base"/>
                    </BasicFrame>
                    <DesignContainer projects={data} searchTerm={searchTerm} onSearch={handleSearch} isLoading={isLoading} max_width="860px"/>
                </BasicFrame>
                <DesignDialog onClose={handleClose} open={openDialog} isBase={true}/>
            </GenericFrame>
            ) 
            :
            (<NotFound root=""/>)} 
    </Fragment>
    );
}

export default DesigView;