function AdditionalDetails(props) {
  
    const [isTemplateUpdated, setIsTemplateUpdated] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true);

    const dispatch = ReactRedux.useDispatch();
    const { FilledFormJson, isInViewMode, vendorId, isCentrilized } = ReactRedux.useSelector((state) => {
        return {
            FilledFormJson: state.vendor.additionalDetails.FilledFormJson,
            isInViewMode: state.vendor.editAccess.isInViewMode,
            vendorId: state.vendor.vendorId,
            isCentrilized: state.vendor.isUserCentrilized
        };
    })

    React.useEffect(() => {
            //Fetch Form
            fetch("/Vendor/GetVendorAdditionalDetailsByVendorId?VendorId=" + vendorId)
                .then((response) => response.json())
                .then((val) => {
                    if (val.status == "success") {
                        res = val.data;
                        //setIsTemplateUpdated(res.IsTemplateChanged)
                        let data = JSON.parse(res.FilledFormJson);
                        if (data.action) {
                            dataCopy = props.getData(data.action)
                            dispatch({
                                type: "ADDITIONAL_DETAILS_FORM",
                                payload: { FilledFormJson: dataCopy }
                            });
                        }
                        else {
                            dataCopy = props.getData(data)
                            dispatch({
                                type: "ADDITIONAL_DETAILS_FORM",
                                payload: { FilledFormJson: dataCopy }
                            })
                        }
                    }
                    else {
                        toastr.error(val.message)
                    }
                })
            .catch((err) => toastr.error("Form Fetch Failure"))
            .finally(() => setIsLoading(false))

    }, []);

    if (isLoading)
        return <div className="loadingOverlayVd"><i className="fa fa-spinner fa-spin fa-3x fa-fw" style={{ left: "50%", position: "absolute", top: "40%" }}></i><span class="sr-only">Loading...</span></div>

    return (
        <React.Fragment>
            <div className="vendorAdditionalDetails-container">
                { isTemplateUpdated != false && <InfoPopup title="Update Additional Details"
                    msg=" Template has been updated , please update the details accordingly" />}

                {FilledFormJson && (isInViewMode || !isCentrilized) && FilledFormJson.length > 0 && <FormRender data={FilledFormJson} readOnly={true} isComponentUpdate={true} />}
                {FilledFormJson && !isInViewMode && isCentrilized && FilledFormJson.length > 0 && <FormRender data={FilledFormJson} readOnly={false} isComponentUpdate={true} />}
            
            </div>
        </React.Fragment>
    )
}