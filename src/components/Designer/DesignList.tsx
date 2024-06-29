import { Fragment, useEffect, useState } from 'react';
import { Box, Container, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { Filtered } from '../../utils/filtered';
import { DesignItem } from '../../interfaces/design/design.interface';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import { useNavigate } from 'react-router-dom';
import TypographyFlow from '../../common/Typography/TypographyFlow';
import ButtonDisableUI from '../../common/Button/ButtonDisableUI';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteAsset } from '../../queries/useDesign';

interface DesigListProps {
  projects: DesignItem[] | undefined;
  name?: string;
  activeDelete: boolean;
  remove?: () => void;
}

const DesignList: React.FC<DesigListProps> = ({projects, name='', activeDelete, remove}) => {
  const queryClient = useQueryClient();
  const [IdNumber, setIdNumber] = useState(0);
  const filtered = Filtered(projects, 'titulo', name);
  const {mutate, isLoading, isSuccess, isError, reset} = useDeleteAsset();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      remove!();
      reset();
      setIdNumber(0);
    } else if (isError) {
      reset();
      setIdNumber(0);
    }
}, [isError, isSuccess, isLoading, remove, reset]);

  const handleEdit = (id: number) => {
    queryClient.removeQueries(['asset_detail', id.toString()]);
    queryClient.refetchQueries(['asset_detail', id.toString()]);
    navigate(`/design/info/${id}`);
  }

  const handleDelete = (id: number) => {
    setIdNumber(id);
    mutate(id);
  }

  const handleSelect = (id_select: number) => {
    if (IdNumber !== 0 && id_select == IdNumber) {
      return true;
    }
    return false;
  }
  
  return (
  <Fragment>
    {filtered.length !== 0 ? 
    (<List style={{ height: '100%', width: '100%', margin:'0', padding:'0' , overflowY: 'auto'}}>
     {filtered?.map((project: DesignItem) => (
         <ListItem key={project.id} style={{ display: 'flex', justifyContent: 'space-between', height: '3.5em' }}>
          <Box style={{ display: 'flex', flexDirection:'row', alignItems: 'center' }}>
              <ListItemIcon>
                  <LabelImportantIcon />
              </ListItemIcon>
              <Container style={{ display: 'flex', flexDirection:'row', alignItems: 'center', paddingLeft:0 }}>
                <TypographyFlow style={{ fontWeight:'bold'}}>{project.titulo}</TypographyFlow> &nbsp;
                <TypographyFlow>/</TypographyFlow> &nbsp;
                <TypographyFlow>Sub-elem: {project.number_children}</TypographyFlow>
              </Container>
          </Box>
          <BasicFrame isCentered={false} className="flex justify-between">
            {activeDelete && <ButtonDisableUI text='Eliminar' disabled={isLoading && handleSelect(project.id)} onClick={() => {handleDelete(project.id)}} color='#FF5C88' className='mr-2'/>}
            <ButtonDisableUI text='Editar' onClick={() => {handleEdit(project.id)}} className='mr-2'/>
            <ButtonDisableUI text='Expandir' disabled={project.number_children == 0} onClick={() => {navigate(`/design/${project.id}`)}}/>
          </BasicFrame>
         </ListItem>
    ))}
    </List>)
    :(
      <BasicFrame className='w-full h-full'>
          <Typography>No asset found</Typography>
      </BasicFrame>
    )}
  </Fragment>);
}

export default DesignList;
