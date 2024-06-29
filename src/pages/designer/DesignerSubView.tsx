import React, { Fragment, useState } from "react";
import { GenericFrame } from "../../common/Frame/GenericFrame";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import { Button, Typography } from "@mui/material";
import { useAssetById } from "../../queries/useDesign";
import Progress from "../../common/Progress/Progress";
import GenericPaper from "../../common/Container/GenericPaper";
import Search from "../../common/Search/Search";
import DesigList from "../../components/Designer/DesignList";
import NotFound from "../not_found/NotFound";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DesignerSubView: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {isLoading, data} = useAssetById(params.id as string);
    const [searchTerm, setSearchTerm] = useState('');

    const handleBack = (id: number) => { (id)?(navigate(`/design/${id}`)):(navigate(`/designs`))};
    const handleSearch = (term: string) => {
        const searchTerm = term.trim().toLowerCase();
        setSearchTerm(searchTerm);
    };
    
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
                        <BasicFrame isCentered={false} className="flex-col pb-4" style={{width: '90vw', maxWidth: '860px'}}>
                            <Typography style={{ fontSize: '1.3em'}}>Diseñador de<span style={{fontWeight: 'bold'}}> Assets</span></Typography>
                        </BasicFrame>
                        <BasicFrame isCentered={false} className="card-container items-start justify-between">
                            <GenericPaper style={{height: '530px', width: '90vw', maxWidth: '860px'}}>
                                <BasicFrame isCentered={false} className="pb-1 justify-between">
                                    <BasicFrame isCentered={false}>
                                        <span className="flex-col pb-3">root {`>`}</span> &nbsp; 
                                        {data[0].depth > 1 && <span className="flex-col pb-3">... {`>`}&nbsp;</span>}
                                        <span className="flex-col pb-3">{data[0].father_name}</span>
                                    </BasicFrame>
                                    <BasicFrame isCentered={false}>
                                        <Button onClick={() => {handleBack(data[0].grandfather_id)}} className="flex items-center" style={{backgroundColor:'#fff', textTransform: 'none', padding:'0',}}>
                                            <ArrowBackIcon style={{height:'0.78em', width:'0.7em', color: 'ml-primary', marginRight:'5px'}}/>
                                            <Typography variant="caption" className="ml-1">Atrás</Typography>
                                        </Button>
                                    </BasicFrame>
                                </BasicFrame>
                                <Search searchTerm={searchTerm} onSearch={handleSearch}/>
                                <GenericPaper className="mt-4" style={{padding:'0.5em', height: '75%'}}>
                                    {(isLoading) ? (
                                        <Progress />
                                    ):( 
                                        <DesigList projects={data} name={searchTerm} activeDelete={false}/>
                                    )}
                                </GenericPaper>
                            </GenericPaper>
                        </BasicFrame>
                    </BasicFrame>
                </GenericFrame>
                ) 
                :
                (<NotFound root=""/>)
            } 
        </Fragment>
    );
}

export default DesignerSubView;