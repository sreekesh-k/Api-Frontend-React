function Review(props) {
    const dispatch = ReactRedux.useDispatch()
    const [stages, setStages] = React.useState([]);
    const [numberOfApprovalStages, setNumberOfApprovalStages] = React.useState(0);
    const [stageRequired, setStageRequired] = React.useState(true);
    const [controls, setControls] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    function setFormBuilderData() {
        setControls([])
    }
    React.useEffect(() => {
        dispatch({
            type: "SET_REVIEW",
            payload: { StageJson: stages }
        });
    }, [stages])
    const { vendorId, isInViewMode, isCentrilized } = ReactRedux.useSelector((state) => {
        return { vendorId: state.vendor.vendorId, isInViewMode: state.vendor.editAccess.isInViewMode, isCentrilized: state.vendor.isUserCentrilized }
    });

    React.useEffect(() => {
        fetch("/Stages/FecthStageByEntityId?entityId=" + vendorId + "&moduleName=Vendor").then((res) => res.json())
            .then((response) => {
                if (response.StatusCode == 200) {
                    if (response.data) {
                        var stagesData = JSON.parse(response.data.StageJson);
                        stagesData.map((tempstage) => {
                            tempstage.IsMaster = tempstage.IsMandatory;
                            tempstage.FormGroup.map((tempgroup) => {
                                tempgroup.id = Math.random();
                            })
                        })
                        if (stagesData.length != 0) {
                            setNumberOfApprovalStages(stagesData.length);
                            setStageRequired(false)
                            setStages(stagesData);
                        }
                    }
                }
                else {
                    toastr.error(response.Message)
                }
            })
            .catch((err) => toastr.error("Unable To Fetch Stages"))
            .finally(() => setIsLoading(false))
    }, [])
    if (isLoading)
        return <div className="loadingOverlayVd"><i className="fa fa-spinner fa-spin fa-3x fa-fw" style={{ left: "50%", position: "absolute", top: "40%" }}></i><span class="sr-only">Loading...</span></div>
    return (
        <React.Fragment>
            {/*<div className={(isInViewMode || !isCentrilized) ? "viewModeOnly" : "enableEdit"} />*/}
            <StagesMain {...{ props }} stages={stages} setStages={setStages}
                numberOfApprovalStages={numberOfApprovalStages} setNumberOfApprovalStages={setNumberOfApprovalStages}
                currentLanguage={currentLanguage} translatorObject={translatorObject}
                stageRequired={stageRequired} setStageRequired={setStageRequired} setFormBuilderData={setFormBuilderData} isReview={true} isReviewInViewMode={isInViewMode || !isCentrilized } />
         
        </React.Fragment>
    )
}