import GenericPaper from "../../common/Container/GenericPaper";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import Progress from "../../common/Progress/Progress";
import Search from "../../common/Search/Search";
import { DesignItem } from "../../interfaces/design/design.interface";
import DesigList from "./DesignList";

interface DesignContainerProps {
    projects: DesignItem[] | undefined;
    searchTerm: string;
    onSearch:(searchTerm: string) => void;
    isLoading: boolean;
    max_width?: string;
    isContent?: boolean;
    activeDelete?: boolean;
    reset?: () => void;
}

const DesignContainer: React.FC<DesignContainerProps> = ({projects, searchTerm, onSearch, isLoading, max_width, isContent=true, activeDelete=false, reset}) => {
    return (
        <BasicFrame isCentered={false} className="card-container items-start justify-between w-full">
            {
                isContent ?
                <GenericPaper style={{height: '530px', width: '90vw', maxWidth: max_width}}>
                    <Search searchTerm={searchTerm} onSearch={onSearch}/>
                    <GenericPaper className="mt-4" style={{padding:'0.5em', height: '85%'}}>
                        {(isLoading) ? (
                            <Progress />
                        ):( 
                            <DesigList projects={projects} name={searchTerm} activeDelete={activeDelete}/>
                        )}
                    </GenericPaper>
                </GenericPaper> :
                <BasicFrame isCentered={false} className="flex flex-col" style={{height: '530px', width: max_width}}>
                    <Search searchTerm={searchTerm} onSearch={onSearch}/>
                    <GenericPaper className="mt-4" style={{padding:'0.5em', height: '85%'}}>
                        {(isLoading) ? (
                            <Progress />
                        ):( 
                            <DesigList projects={projects} name={searchTerm} activeDelete={activeDelete} remove={reset}/>
                        )}
                    </GenericPaper>
                </BasicFrame>
            } 
        </BasicFrame>
    );
}

export default DesignContainer;