import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Divider, Typography } from "@mui/material";
import GenericPaper from "../../common/Container/GenericPaper";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import Progress from "../../common/Progress/Progress";
import TextFieldUI from "../../common/TextField/TextFieldUI";
import { useNavigate, useParams } from "react-router-dom";
import { useAssetInfoById, useDeleteAsset, useUpdateAsset } from "../../queries/useDesign";
import { Design, DesignRequest, Price } from "../../interfaces/design/design.interface";
import ButtonDisableUI from "../../common/Button/ButtonDisableUI";

const DesignEdit: React.FC = () => {
    const params = useParams();
    const {isLoading, data} = useAssetInfoById(params.id as string);
    const navigate = useNavigate();
    const {isLoading: isDelete, mutate: deleted, isSuccess} = useDeleteAsset();
    const {mutate, isLoading: update} = useUpdateAsset();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleBack = (id: number) => {if(id !== undefined){(id)?(navigate(`/design/${id}`)):(navigate(`/designs`))}};

    useEffect(() => {
        if (isSuccess && data) {
            handleBack(data.father_id!);
        }
  }, [isSuccess, data, handleBack]);

    const [titulo, setTitulo] = useState('');
    const [description, setDescription] = useState('');
    const [more_description, setMoreDescription] = useState('');
    const [url, setUrl] = useState('');
    const [url_type, setUrlType] = useState('');
    const [price, setPrice] = useState(0);

    const titulo_data = titulo !== '' && data && titulo !== data?.name;
    const description_data = description !== '' && data && description !== data?.short_description;
    const more_description_data = more_description !== '' && data && more_description !== data?.long_description;
    const url_data = url !== '' && data && url !== data?.url;
    const url_type_data = url_type !== '' && data && url_type !== data?.url_type;
    const price_data = price !== 0 && data && price !== data?.price;
    const check = () =>  !( titulo_data || description_data || more_description_data || url_data || url_type_data || price_data);

    const PriceConst = (price: number): Price => {
        return {id_role: 1, price: price};
    };

    const handleTitulo = (titulo: string) => setTitulo(titulo);
    const handleDescription = (description: string) => setDescription(description);
    const handleMoreDescription = (more_description: string) => setMoreDescription(more_description);
    const handleUrl = (url: string) => setUrl(url);
    const handleUrlType = (url_type: string) => setUrlType(url_type);
    const handlePrice = (price: number) => setPrice(price);

    const handleSaveChanges = () => {
        const asset: Design = {};
        if(titulo_data) asset.name = titulo;
        if(description_data) asset.short_description = description;
        if(more_description_data) asset.long_description = more_description;
        if(url_data) asset.url = url;
        if(url_type_data) asset.url_type = url_type;
        if(price_data) asset.prices = price === 0 ? [] : [PriceConst(price)];
        const request: DesignRequest = { id: data!.id, design: asset};
        mutate(request);
    }

    const handleDelete = (id: number) => {
        deleted(id);
    }

    return (
        <GenericPaper style={{borderRadius:'.375rem', width: '90vw', maxWidth: '1046px', minHeight: '100px', padding:'1.8em', boxShadow:'0'}}>
            <Box className=" flex items-start place-content-between">
                <Typography style={{fontWeight:'500', fontSize:'1.1em'}}>Editar Asset</Typography>
                {data && <ButtonDisableUI text='Eliminar' disabled={isDelete} onClick={() => {handleDelete(data.id)}} color='#FF5C88' className='mr-2'/>}
            </Box>
            <Divider style={{marginBottom:'24px', paddingTop:'20px'}}/>
            {
                isLoading ? 
                <BasicFrame className="w-full" style={{height:'254px'}}>
                    <Progress/>
                </BasicFrame>
                :
                <BasicFrame isCentered={false} className="items-start flex-col">
                    <TextFieldUI title="TITULO" defaultValue={data?.name} setObject={handleTitulo} distance='6.9em'/>
                    <TextFieldUI title="DESCRIPTION" multiline={true} defaultValue={data?.short_description} setObject={handleDescription} distance='5em'/>
                    <TextFieldUI title="MORE DESCRIPTION" multiline={true} defaultValue={data?.long_description} setObject={handleMoreDescription} distance='3em'/>
                    <TextFieldUI title="URL" defaultValue={data?.url} setObject={handleUrl} distance='7.9em'/>
                    <TextFieldUI title="URL TYPE" defaultValue={data?.url_type} setObject={handleUrlType} distance='6.2em'/>
                    <TextFieldUI title="PRICE" defaultValue={data?.price} setObject={handlePrice} distance='7.3em' type='number'/>
                    <BasicFrame isCentered={false} className="items-center justify-center mt-4">
                    {
                        !update ?
                        <Button
                            disabled={check()}
                            variant="contained"
                            onClick={()=> {handleSaveChanges()}}
                            sx={{
                                opacity: (check()) ? 0.5 : 1,
                                '&:disabled': {
                                backgroundColor: 'grey',
                                },
                            }}
                            style={{textTransform:'none', fontSize:'0.65em', borderRadius:'6px' }}>
                                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {(false) && (
                                        <CircularProgress 
                                            size={24} 
                                            sx={{ color: 'white', position: 'absolute' }}
                                        />
                                    )}
                                    <span style={{ color: 'white' }}>Save Changes</span>
                            </Box>
                        </Button>
                        :
                        <Button
                            disabled
                            sx={{
                                opacity: 0.5,
                                '&:disabled': {
                                backgroundColor: 'grey',
                                },
                            }}
                            style={{textTransform:'none', fontSize:'0.65em', borderRadius:'6px', height:'32px', width:'109px' }}>
                                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {(true) && (
                                        <CircularProgress 
                                            size={19} 
                                            sx={{ color: 'white', position: 'absolute' }}
                                        />
                                    )}
                                </Box>
                        </Button>
                    }
                </BasicFrame>
            </BasicFrame>
            }
        </GenericPaper>
    );
}

export default DesignEdit;