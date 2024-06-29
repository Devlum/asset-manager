import { Box, Button, Typography } from "@mui/material";
import { GenericFrame } from "../../common/Frame/GenericFrame";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useAssetInfoById } from "../../queries/useDesign";
import DesignEdit from "../../components/Designer/DesignEdit";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DesignSubSection from "../../components/Designer/DesginSubSection";
import DesignImage from "../../components/Designer/DesignImage";
import Progress from "../../common/Progress/Progress";
import NotFound from "../not_found/NotFound";

const DesignerInfoView: React.FC = () => {
    const params = useParams();
    const {data, isLoading} = useAssetInfoById(params.id as string);
    const navigate = useNavigate();
    const handleBack = (id: number) => {if(id !== undefined){(id)?(navigate(`/design/${id}`)):(navigate(`/designs`))}};
    return (
        <Fragment>
            { isLoading ? 
                (<GenericFrame>
                    <Progress/> 
                </GenericFrame>)
                : data ? 
                (
                    <GenericFrame isCentered={false} className="items-start justify-center">
                        <BasicFrame isCentered={false} className="mt-10" style={{flexDirection:'column'}}>
                            <BasicFrame isCentered={false} className="flex justify-between pb-6">
                                <Typography style={{ fontSize: '1.3em', fontWeight:'500'}}>Información de Asset</Typography>
                                <BasicFrame isCentered={false}>
                                    <Button onClick={() => {handleBack(data!.father_id)}} className="flex items-center" style={{backgroundColor:'#fff', textTransform: 'none', padding:'0',}}>
                                        <ArrowBackIcon style={{height:'0.78em', width:'0.7em', color: 'ml-primary', marginRight:'5px'}}/>
                                        <Typography variant="caption" className="ml-1">Atrás</Typography>
                                    </Button>
                                </BasicFrame>
                            </BasicFrame>
                            <BasicFrame isCentered={false} className="card-container items-start justify-between">
                                <BasicFrame className="flex-col">
                                    <DesignEdit/>
                                    <Box marginBottom={4}/>
                                    <DesignSubSection/>
                                    <Box marginBottom={4}/>
                                    <DesignImage/>
                                </BasicFrame>
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
export default DesignerInfoView;