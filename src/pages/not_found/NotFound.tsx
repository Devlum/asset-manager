import { Typography } from "@mui/material";
import { GenericFrame } from "../../common/Frame/GenericFrame";
import { BasicFrame } from "../../common/Frame/BasicFrame";

const NotFound: React.FC<{root: string}> = ({root=''}) => {
  return(
    <GenericFrame>
        <BasicFrame className="flex-col">
            <Typography sx={{fontSize:'1.2em', fontWeight:'bold'}}>Page not found</Typography>
            {root !== '' && <Typography sx={{fontSize:'1em'}}>/{root}</Typography>}
        </BasicFrame>
    </GenericFrame>
  );
}

export default NotFound;