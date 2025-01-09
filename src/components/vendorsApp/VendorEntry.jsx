const Provider = window["ReactRedux"].Provider;
function VendorEntry(props) {
    const store = props.Store();
    const VendorCategorization = props.VendorCategorization;
    const VendorDetailsForm = props.VendorDetailsForm;
    const VendorRating = props.VendorRating;
    const VendorApp = props.VendorApp;

    return <Provider store={store}>
        <VendorApp VendorDetailsForm={VendorDetailsForm} VendorCategorization={VendorCategorization} VendorRating={VendorRating} />
    </Provider>

}