import { Fragment, useEffect, useState } from 'react';
import { Box, Container, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { Design, Image } from '../../interfaces/design/design.interface';
import { BasicFrame } from '../../common/Frame/BasicFrame';

import ButtonDisableUI from '../../common/Button/ButtonDisableUI';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { useDeleteImageToAsset } from '../../queries/useDesign';

interface DesigListProps {
    images: Image[];
    design: Design;
    remove?: () => void;
}

const DesignImageList: React.FC<DesigListProps> = ({images, design, remove}) => {
    const [IdNumber, setIdNumber] = useState(-1);
    const {mutate, isLoading, isSuccess, isError, reset} = useDeleteImageToAsset();

    useEffect(() => {
        if (isSuccess) {
          remove!();
          reset();
          setIdNumber(-1);
        } else if (isError) {
          reset();
          setIdNumber(-1);
        }
    }, [isError, isSuccess, isLoading, remove, reset]);
    
    const openExternalUrl = (url: string) => {
        window.open(url, '_blank');
      };

      const handleSelect = (id_select?: number) => {
          if (IdNumber !== -1 && id_select == IdNumber) {
              return true;
          }
          return false;
    }

    const handleDelete = (order?: number) => {
        console.log(order);
        if(order !== undefined && design && design.id){
            setIdNumber(order);
            mutate({id_owner: design.id, order: order});
        }
    }
    return (
        <Fragment>
            {images.length !== 0 ? 
            (<List style={{ height: '100%', width: '100%', margin:'0', padding:'0' , overflowY: 'auto'}}>
            {images.map((image: Image) => (
                <ListItem key={image.order} style={{ display: 'flex', justifyContent: 'space-between', height: '10em' }}>
                <Box style={{ display: 'flex', flexDirection:'row', alignItems: 'center' }}>
                    <ListItemIcon>
                        <LabelImportantIcon />
                    </ListItemIcon>
                    <Container style={{ display: 'flex', flexDirection:'row', alignItems: 'center', paddingLeft:0 }}>
                        <img src={`${image.image}`} alt={''} style={{width: 'auto', height:'120px'}}/>
                    </Container>
                </Box>
                <BasicFrame isCentered={false} className="flex justify-between">
                    {}<ButtonDisableUI text='Eliminar' disabled={isLoading && handleSelect(image.order)} onClick={() => {handleDelete(image.order)}} className='mr-2' color='#FF5C88'/>
                    <ButtonDisableUI text='Ver' onClick={() => {openExternalUrl(image.image)}}/>
                </BasicFrame>
                </ListItem>
            ))}
            </List>)
            :(
            <BasicFrame className='w-full h-full'>
                <Typography>No images found</Typography>
            </BasicFrame>
            )}
            
        </Fragment>);
}

export default DesignImageList;
