// /src/hooks/useStages.js
import { useState } from "react";
import { initialStages } from "../utils/StagesData";

export const useStages = () => {
    const [stages, setStages] = useState(initialStages);

    const toggleStage = (stageName) => {
        setStages((prevStages) =>
            prevStages.map((stage) =>
                stage.name === stageName
                    ? {
                        ...stage,
                        selected: !stage.selected,
                        statuses: stage.statuses.map((status) => ({
                            ...status,
                            selected: !stage.selected,
                        })),
                    }
                    : stage
            )
        );
    };

    const toggleStatus = (stageName, statusName) => {
        setStages((prevStages) =>
            prevStages.map((stage) =>
                stage.name === stageName
                    ? {
                        ...stage,
                        statuses: stage.statuses.map((status) =>
                            status.name === statusName
                                ? { ...status, selected: !status.selected }
                                : status
                        ),
                        selected: stage.statuses.every((status) =>
                            status.name === statusName
                                ? !status.selected
                                : status.selected
                        ),
                    }
                    : stage
            )
        );
    };

    return { stages, toggleStage, toggleStatus };
};
