import { createStore } from "redux";

const vendor = {
  activeTab: sessionStorage.getItem("activeTabId") || "VendorDetails",
  vendorType:
    sessionStorage.getItem("vendorType") !== null
      ? sessionStorage.getItem("vendorType")
      : "DSA",
  vendorId:
    sessionStorage.getItem("vendorDetails") !== null
      ? JSON.parse(sessionStorage.getItem("vendorDetails")).VendorId
      : "",
  isUserCentrilized: true,
  vendorName:
    sessionStorage.getItem("vendorDetails") !== null
      ? JSON.parse(sessionStorage.getItem("vendorDetails")).VendorName
      : "",
  rating: {
    ratingData: [],
    ratingSaveData: [],
    averageVendorRatingModel: {
      Id: "",
      VendorId: "",
      TotalScore: 0,
      EligibleScore: 0,
      Conculusion: "",
      Devaitions: "",
      FileStream: "",
      FileName: "",
      MaxVendorRatingScore: 0,
    },
    financialForm: {
      FinancialList: [],
      vendorRatingFinancialInfoReadModel: {},
      conditions: {
        FinancialFormOnTypes: "",
        FinancialFormOnNatureOfServices: [],
        FinacialFormBillingMaxLimit: 0,
      },
    },
    elligibleScore: [],
    elligibleScoreStatus: {
      level: "",
      color: "",
      score: 0,
    },
  },
  categorization: {
    data: [],
    gtScore: 0,
    loading: false,
    scoreRating: "",
    notificationData: {
      ReviewerRemarks: "",
      LastReviewSentOn: "",
      Reviewers: [],
    },
    //saveData:[]
  },
  details: {
    FormData: [],
    URN: "",
    IsActive: true,
    InActivationDate: "",
    ReasonOfInactivation: "",
    InActivationEvidence: "",
  },
  additionalDetails: {
    FilledFormJson: [],
  },
  review: {
    StageJson: [],
  },
  editAccess: {
    hasEditAccess: false,
    isInViewMode:
      localStorage.getItem("isViewMode") !== null
        ? JSON.parse(localStorage.getItem("isViewMode"))
        : true,
  },
  vendorDetails: {
    details: JSON.parse(sessionStorage.getItem("vendorDetails")),
  },
};

const vendorReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TAB":
      let localState = state.vendor;
      localState.activeTab = action.payload;
      return (state = { vendor: localState });
    case "SAVE_VENDOR_ID":
      let v_id_state = state.vendor;
      v_id_state.vendorId = action.payload;
      return (state = { vendor: v_id_state });
    case "CHANGE_VENDOR_DETAILS":
      let localState2 = state.vendor;
      const { vendorType, vendorDepartment } = action.payload;
      localState2.vendorType = vendorType;
      localState2.vendorDepartment = vendorDepartment;
      return (state = { vendor: localState2 });
    case "UPDATE_RATING_DATA":
      let ratingState = state.vendor;
      const { vendorData } = action.payload;
      ratingState.vendorData = vendorData;
      return (state = { vendor: ratingState });
    case "UPDATE_CATEGORIZATION_DATA":
      let cateState = state.vendor;
      const data = action.payload;
      cateState.categorization.data = data;
      return (state = { vendor: cateState });
    case "UPDATE_SAVING_CATEGORIZATION_DATA":
      let saveCateState = state.vendor;
      const save_cate_data = action.payload;
      saveCateState.categorization.saveData = save_cate_data;
      return (state = { vendor: saveCateState });
    case "SAVE_CATEGORIZATION_DATA":
      let saveState = state.vendor;
      return state;
    case "CHANGE_VENOR_DETAILS_FORM":
      let detailsState = state.vendor;
      const { FormData, IsActive, URN, Type } = action.payload;
      detailsState.details.FormData = FormData;
      detailsState.details.Type = Type;
      if (IsActive !== undefined) {
        detailsState.details.IsActive = IsActive;
      }
      if (URN !== undefined) {
        detailsState.details.URN = URN;
      }
      return (state = { vendor: detailsState });
    case "SET_URN":
      let detailsState2 = state.vendor;
      detailsState2.details.URN = action.payload.URN;
      return (state = { vendor: detailsState2 });
    case "SET_IS_ACTIVE":
      let detailsState3 = state.vendor;
      detailsState3.details.IsActive = action.payload.IsActive;
      let status = action.payload.IsActive;
      if (status == true) {
        detailsState3.details.InActivationDate = "";
        detailsState3.details.ReasonOfInactivation = "";
        detailsState3.details.InActivationEvidence = "";
      }
      return (state = { vendor: detailsState3 });
    case "SET_INACTIVATION":
      let detailsState4 = state.vendor;
      const { InActivationDate, ReasonOfInactivation, InActivationEvidence } =
        action.payload;
      if (InActivationDate != undefined)
        detailsState4.details.InActivationDate = InActivationDate;
      if (ReasonOfInactivation != undefined)
        detailsState4.details.ReasonOfInactivation = ReasonOfInactivation;
      if (InActivationEvidence != undefined)
        detailsState4.details.InActivationEvidence = InActivationEvidence;
      return { vendor: detailsState4 };
    case "ADDITIONAL_DETAILS_FORM":
      let detailsState5 = state.vendor;
      const { FilledFormJson } = action.payload;
      detailsState5.additionalDetails.FilledFormJson = FilledFormJson;
      return { vendor: detailsState5 };
    case "SET_REVIEW":
      let detailsState6 = state.vendor;
      const { StageJson } = action.payload;
      detailsState6.review.StageJson = StageJson;
      return { vendor: detailsState6 };
    case "SET_VENDOR_RATING":
      let raringState = state.vendor;
      const { ratingData } = action.payload;
      raringState.rating.ratingData = ratingData;
      return { vendor: raringState };
    case "UPDATE_EDIT_ACCESS": // access to edit the fields in tabs
      let accessState = state.vendor;
      const { isInViewMode } = action.payload;
      localStorage.setItem(
        "isViewMode",
        JSON.stringify(isInViewMode ? true : false)
      );
      accessState.editAccess.isInViewMode = isInViewMode;
      return (state = { vendor: accessState });
    case "UPDATE_SAVING_RATING_DATA":
      let save_rating_state = state.vendor;
      const save_rating_data = action.payload;
      save_rating_state.rating.ratingSaveData = save_rating_data;
      return (state = { vendor: save_rating_state });
    case "UPDATE_VENDOR_RATING_MODEL":
      let ratingModelState = state.vendor;
      const {
        TotalScore,
        EligibleScore,
        Conculusion,
        Devaitions,
        FileStream,
        FileName,
        MaxVendorRatingScore,
        FinancialFormOnTypes,
        FinancialFormOnNatureOfServices,
        FinacialFormBillingMaxLimit,
      } = action.payload;
      if (TotalScore !== undefined)
        ratingModelState.rating.averageVendorRatingModel.TotalScore =
          TotalScore;
      if (EligibleScore !== undefined)
        ratingModelState.rating.averageVendorRatingModel.EligibleScore =
          EligibleScore;
      if (Conculusion !== undefined)
        ratingModelState.rating.averageVendorRatingModel.Conculusion =
          Conculusion;
      if (Devaitions !== undefined)
        ratingModelState.rating.averageVendorRatingModel.Devaitions =
          Devaitions;
      if (FileStream !== undefined)
        ratingModelState.rating.averageVendorRatingModel.FileStream =
          FileStream;
      if (FileName !== undefined)
        ratingModelState.rating.averageVendorRatingModel.FileName = FileName;
      if (MaxVendorRatingScore !== undefined)
        ratingModelState.rating.averageVendorRatingModel.MaxVendorRatingScore =
          MaxVendorRatingScore;
      if (FinancialFormOnTypes !== undefined)
        ratingModelState.rating.averageVendorRatingModel.FinancialFormOnTypes =
          FinancialFormOnTypes;
      if (FinancialFormOnNatureOfServices !== undefined) {
        //To recheck if needed
        ratingModelState.rating.averageVendorRatingModel.FinancialFormOnNatureOfServices =
          FinancialFormOnNatureOfServices;
      }
      if (FinacialFormBillingMaxLimit !== undefined)
        ratingModelState.rating.averageVendorRatingModel.FinacialFormBillingMaxLimit =
          FinacialFormBillingMaxLimit;
      return (state = { vendor: ratingModelState });
    case "UPDATE_RATING_FINANCIAL_FORM":
      let financialState = state.vendor;
      const { FinancialList, vendorRatingFinancialInfoReadModel } =
        action.payload;
      financialState.rating.financialForm.FinancialList = FinancialList;
      financialState.rating.financialForm.vendorRatingFinancialInfoReadModel =
        vendorRatingFinancialInfoReadModel;
      return (state = { vendor: financialState });
    case "UPDATE_RATING_ELLIGIBLE_SCORE":
      let ratingElligibleState = state.vendor;
      const { elligibleScore } = action.payload;
      ratingElligibleState.rating.elligibleScore = elligibleScore;
      return (state = { vendor: ratingElligibleState });
    case "UPDATE_RATING_ELLIGIBLE_SCORE_STATUS":
      let ratingElligibleStatusState = state.vendor;
      const { level, color, score } = action.payload;
      ratingElligibleStatusState.rating.elligibleScoreStatus.level = level;
      ratingElligibleStatusState.rating.elligibleScoreStatus.color = color;
      ratingElligibleStatusState.rating.elligibleScoreStatus.score = score;
      return (state = { vendor: ratingElligibleStatusState });
    case "CATEGORIZATION_NOTIFICATION_DATA":
      let cNotifyState = state.vendor;
      const cNdata = action.payload[0];
      const { ReviewerRemarks, LastReviewSentOn, Reviewers } = cNdata;
      cNotifyState.categorization.notificationData.ReviewerRemarks =
        ReviewerRemarks;
      cNotifyState.categorization.notificationData.LastReviewSentOn =
        LastReviewSentOn;
      cNotifyState.categorization.notificationData.Reviewers = Reviewers;
      return (state = { vendor: cNotifyState });
    case "CHANGE_CATEG_REVIEW":
      let cateReviewState = state.vendor;
      const catReviewValue = action.payload;
      cateReviewState.categorization.notificationData.ReviewerRemarks =
        catReviewValue;
      return (state = { vendor: cateReviewState });
    case "CHANGE_CATEG_REVIEWRS":
      let cateReviewrsState = state.vendor;
      const catReviewerValues = action.payload;
      cateReviewrsState.categorization.notificationData.Reviewers =
        catReviewerValues;
      return (state = { vendor: cateReviewrsState });
    case "CHANGE_VENDOR_NAME":
      let vd_name_state = state.vendor;
      const _vd_name = action.payload;
      vd_name_state.vendorName = action.payload;
      return (state = { vendor: vd_name_state });
    default:
      return state;
  }
};
const store = createStore(vendorReducer, { vendor });

export default store;
//store.unsubscribe()
