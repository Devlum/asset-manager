import React, { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, Typography } from '@mui/material';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import { useNotification } from '../../hooks/useNotification';
import { useAddImageToAsset } from '../../queries/useDesign';
import { Design } from '../../interfaces/design/design.interface';
import { useQueryClient } from '@tanstack/react-query';
import ButtonValidateUI from '../../common/Button/ButtonValidateUI';
import ClearIcon from '@mui/icons-material/Clear';
interface DesignDialogImageProps {
  open: boolean;
  onClose: () => void;
  dataProj: Design | undefined;
}

  const DesignDialogImage: React.FC<DesignDialogImageProps> = ({ open, onClose, dataProj}) => {
    const {mutate, data, isLoading, reset } = useAddImageToAsset();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const {getError} = useNotification();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (data) {
            onClose();
            reset();
            setSelectedImages([]);
            if (dataProj && dataProj.id){
                queryClient.removeQueries(['asset_detail', dataProj.id.toString()]);
                queryClient.refetchQueries(['asset_detail', dataProj.id.toString()]);
            }
        }
  }, [data, onClose, reset, queryClient, dataProj]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      setSelectedImages(fileList);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  const handleSave = () => {
    if (selectedImages.length === 0) {
        getError('Seleccione una imagen');
        return;
    }
    if(dataProj && dataProj.id){
        mutate({id: dataProj.id, images: selectedImages});
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <BasicFrame isCentered={false} className='flex-col' style={{padding:'1em'}}>
        <DialogTitle className='flex items-center justify-start flex-row mb-4'>
            <Typography style={{textAlign:'start', fontSize: '0.9em', fontWeight: '400'}}>Agregar imagenes</Typography>
        </DialogTitle>
        <DialogContent style={{paddingBottom: '0.5em'}}>
            <BasicFrame isCentered={false} className="w-full items-start flex-col">
                <BasicFrame isCentered={false} className="items-start justify-start mb-4 flex flex-col">
                    <Typography style={{fontSize:'1em', fontWeight:'400', color:'#7d8fb1', marginBottom:'1em'}}>Cargar Imagenes</Typography>
                    <Box className="flex">
                        <input style={{fontSize:'0.8em'}} type="file" multiple onChange={handleFileChange} />
                    </Box>
                    {selectedImages.length > 0 && (
                        <Fragment>
                            <Typography style={{fontSize:'0.8em', marginTop:'1em', marginBottom:'0.6em'}} variant="body2">Imágenes seleccionadas:</Typography>
                            <ul>
                                {selectedImages.map((image, index) => (
                                <li style={{ fontSize: '0.8em', marginTop: '0.3em', fontWeight: 'bold', display: 'flex', alignItems: 'center' }} key={index}>
                                    {image.name}
                                    <button 
                                    onClick={() => handleRemoveImage(index)} 
                                    style={{ marginLeft: '1em', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>
                                    <ClearIcon style={{ fontSize: '1.1em' }} />
                                    </button>
                                </li>
                                ))}
                            </ul>
                        </Fragment>
                    )}
                </BasicFrame>
            </BasicFrame>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} style={{fontSize: '0.8em',  borderRadius: '0.7em', width: '82px', textTransform: 'none', backgroundColor:'#262626', color:'#fff' }}>Cancelar</Button>
            <ButtonValidateUI isLoading={isLoading} onClick={handleSave} text='Crear' style={{backgroundColor: 'ml-primary', marginRight:'1em'}} />
        </DialogActions>
        </BasicFrame>
    </Dialog>
  );
};

export default DesignDialogImage;