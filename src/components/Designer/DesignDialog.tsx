import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from '@mui/material';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import ButtonValidateUI from '../../common/Button/ButtonValidateUI';
import { useNotification } from '../../hooks/useNotification';
import { useCreateAsset, useCreateBaseAsset } from '../../queries/useDesign';
import { Design } from '../../interfaces/design/design.interface';
import TextFieldUI from '../../common/TextField/TextFieldUI';
import { useQueryClient } from '@tanstack/react-query';

interface DesignDialogProps {
  open: boolean;
  onClose: () => void;
  dataProj?: Design | undefined;
  isBase?: boolean | undefined;
}

  const DesignDialog: React.FC<DesignDialogProps> = ({ open, onClose, dataProj, isBase}) => {
    const {mutate, data, isLoading, reset } = useCreateAsset();
    const {mutate: base, data: baseRespose, isLoading: loadingBase, reset: baseReset } = useCreateBaseAsset();
    const {getError} = useNotification();
    const queryClient = useQueryClient();
    const [titulo, setTitulo] = useState('');
    const [description, setDescription] = useState('');
    const [more_description, setMoreDescription] = useState('');
    const [url, setUrl] = useState('');
    const [url_type, setUrlType] = useState('');

    useEffect(() => {
        if (data || baseRespose) {
            onClose();
            handleReset();
            if (dataProj && dataProj.id){
                reset();
                queryClient.removeQueries(['asset', dataProj.id.toString()]);
                queryClient.refetchQueries(['asset', dataProj.id.toString()]);
            }else if (isBase !== undefined && isBase){
                baseReset();
                queryClient.removeQueries(['Assets']);
                queryClient.refetchQueries(['Assets']);
            }
        }
  }, [data, baseRespose, isBase, onClose, reset, baseReset, queryClient, dataProj]);

  const handleReset = () => {
    setTitulo('');
    setDescription('');
    setMoreDescription('');
    setUrl('');
    setUrlType('');
  }

  const handleTitulo = (titulo: string) => setTitulo(titulo);
  const handleDescription = (description: string) => setDescription(description);
  const handleMoreDescription = (more_description: string) => setMoreDescription(more_description);
  const handleUrl = (url: string) => setUrl(url);
  const handleUrlType = (url_type: string) => setUrlType(url_type);
  
  const handleSave = () => {
    if(titulo.trim() === ''){
        getError('Titulo es requerido');
        return;
    }
    const asset: Design = { 
        titulo: titulo, 
        description: description, 
        more_description: more_description, 
        url: url, 
        url_type: url_type 
    };
    if(dataProj && dataProj.id != undefined){
        mutate({id: dataProj.id, design: asset});
    } else if(isBase !== undefined && isBase){
        base({id: 0, design: asset});
    }
    else{
        getError('No esta sujeto a un asset');
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <BasicFrame isCentered={false} className='flex-col' style={{padding:'1em'}}>
        <DialogTitle className='flex items-center justify-start flex-row mb-4'>
            <Typography style={{textAlign:'start', fontSize: '0.9em', fontWeight: '400'}}>Crear Sub Asset</Typography>
        </DialogTitle>
        <DialogContent style={{paddingBottom: '0.5em'}}>
            <BasicFrame isCentered={false} className="w-full items-start flex-col">
                <TextFieldUI title="TITULO" defaultValue={data?.titulo} setObject={handleTitulo} distance='6.9em'/>
                <TextFieldUI title="DESCRIPTION" multiline={true} defaultValue={data?.description} setObject={handleDescription} distance='5em'/>
                <TextFieldUI title="MORE DESCRIPTION" multiline={true} defaultValue={data?.more_description} setObject={handleMoreDescription} distance='3em'/>
                <TextFieldUI title="URL" defaultValue={data?.url} setObject={handleUrl} distance='7.9em'/>
                <TextFieldUI title="URL TYPE" defaultValue={data?.url_type} setObject={handleUrlType} distance='6.2em'/>
            </BasicFrame>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} style={{fontSize: '0.8em',  borderRadius: '0.7em', width: '82px', textTransform: 'none', backgroundColor:'#262626', color:'#fff' }}>Cancelar</Button>
            <ButtonValidateUI isLoading={isLoading || loadingBase} onClick={handleSave} text='Crear' style={{backgroundColor: 'ml-primary', marginRight:'1em'}} />
        </DialogActions>
        </BasicFrame>
    </Dialog>
  );
};

export default DesignDialog;