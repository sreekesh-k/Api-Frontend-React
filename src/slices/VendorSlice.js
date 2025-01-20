import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
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
      FileStream: [],
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

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state.activeTab = action.payload;
    },
    saveVendorId: (state, action) => {
      state.vendorId = action.payload;
    },
    changeVendorDetails: (state, action) => {
      const { vendorType, vendorDepartment } = action.payload;
      state.vendorType = vendorType;
      state.vendorDepartment = vendorDepartment;
    },
    updateRatingData: (state, action) => {
      state.rating.vendorData = action.payload.vendorData;
    },
    updateCategorizationData: (state, action) => {
      state.categorization.data = action.payload;
    },
    updateSavingCategorizationData: (state, action) => {
      state.categorization.saveData = action.payload;
    },
    changeVendorDetailsForm: (state, action) => {
      const { FormData, IsActive, URN, Type } = action.payload;
      state.details.FormData = FormData;
      state.details.Type = Type;
      if (IsActive !== undefined) state.details.IsActive = IsActive;
      if (URN !== undefined) state.details.URN = URN;
    },
    setURN: (state, action) => {
      state.details.URN = action.payload.URN;
    },
    setIsActive: (state, action) => {
      state.details.IsActive = action.payload.IsActive;
      if (action.payload.IsActive) {
        state.details.InActivationDate = "";
        state.details.ReasonOfInactivation = "";
        state.details.InActivationEvidence = "";
      }
    },
    setInactivation: (state, action) => {
      const { InActivationDate, ReasonOfInactivation, InActivationEvidence } =
        action.payload;
      if (InActivationDate !== undefined)
        state.details.InActivationDate = InActivationDate;
      if (ReasonOfInactivation !== undefined)
        state.details.ReasonOfInactivation = ReasonOfInactivation;
      if (InActivationEvidence !== undefined)
        state.details.InActivationEvidence = InActivationEvidence;
    },
    additionalDetailsForm: (state, action) => {
      state.additionalDetails.FilledFormJson = action.payload.FilledFormJson;
    },
    setReview: (state, action) => {
      state.review.StageJson = action.payload.StageJson;
    },
    setVendorRating: (state, action) => {
      state.rating.ratingData = action.payload.ratingData;
    },
    updateEditAccess: (state, action) => {
      state.editAccess.isInViewMode = action.payload.isInViewMode;
      localStorage.setItem(
        "isViewMode",
        JSON.stringify(action.payload.isInViewMode)
      );
    },
    updateSavingRatingData: (state, action) => {
      state.rating.ratingSaveData = action.payload;
    },
    updateVendorRatingModel: (state, action) => {
      const model = state.rating.averageVendorRatingModel;
      Object.keys(action.payload).forEach((key) => {
        if (action.payload[key] !== undefined) {
          model[key] = action.payload[key];
        }
      });
    },
    updateRatingFinancialForm: (state, action) => {
      const { FinancialList, vendorRatingFinancialInfoReadModel } =
        action.payload;
      state.rating.financialForm.FinancialList = FinancialList;
      state.rating.financialForm.vendorRatingFinancialInfoReadModel =
        vendorRatingFinancialInfoReadModel;
    },
    updateRatingElligibleScore: (state, action) => {
      state.rating.elligibleScore = action.payload.elligibleScore;
    },
    updateRatingElligibleScoreStatus: (state, action) => {
      const { level, color, score } = action.payload;
      state.rating.elligibleScoreStatus = { level, color, score };
    },
    categorizationNotificationData: (state, action) => {
      const { ReviewerRemarks, LastReviewSentOn, Reviewers } =
        action.payload[0];
      state.categorization.notificationData = {
        ReviewerRemarks,
        LastReviewSentOn,
        Reviewers,
      };
    },
    changeCategorizationReview: (state, action) => {
      state.categorization.notificationData.ReviewerRemarks = action.payload;
    },
    changeCategorizationReviewers: (state, action) => {
      state.categorization.notificationData.Reviewers = action.payload;
    },
    changeVendorName: (state, action) => {
      state.vendorName = action.payload;
    },
  },
});

export const {
  changeTab,
  saveVendorId,
  changeVendorDetails,
  updateRatingData,
  updateCategorizationData,
  updateSavingCategorizationData,
  changeVendorDetailsForm,
  setURN,
  setIsActive,
  setInactivation,
  additionalDetailsForm,
  setReview,
  setVendorRating,
  updateEditAccess,
  updateSavingRatingData,
  updateVendorRatingModel,
  updateRatingFinancialForm,
  updateRatingElligibleScore,
  updateRatingElligibleScoreStatus,
  categorizationNotificationData,
  changeCategorizationReview,
  changeCategorizationReviewers,
  changeVendorName,
} = vendorSlice.actions;

const selectVendor = (state) => state.vendor;

export const selectVendorApp = createSelector([selectVendor], (vendor) => ({
  activeTab: vendor.activeTab,
  vendorId: vendor.vendorId,
  vendorType: vendor.vendorType,
  categorizationData: vendor.categorization.data,
  detailsData: vendor.details,
  additionalDetailsData: vendor.additionalDetails,
  ratingData: vendor.rating.ratingData,
  reviewData: vendor.review,
  hasEditAccess: vendor.editAccess.hasEditAccess,
  isInViewMode: vendor.editAccess.isInViewMode,
  saveRatingData: vendor.rating.ratingSaveData,
  VrTotalScore: vendor.rating.averageVendorRatingModel.TotalScore,
  VrEligibleScore: vendor.rating.elligibleScoreStatus.score,
  VrConculusion: vendor.rating.elligibleScoreStatus.level,
  VrDevaitions: vendor.rating.averageVendorRatingModel.Devaitions,
  VrFileStream: vendor.rating.averageVendorRatingModel.FileStream,
  VrFileName: vendor.rating.averageVendorRatingModel.FileName,
  VrFinancialList: vendor.rating.financialForm.FinancialList,
  VrvendorRatingFinancialInfoReadModel:
    vendor.rating.financialForm.vendorRatingFinancialInfoReadModel,
  VrFinacialFormBillingMaxLimit:
    vendor.rating.averageVendorRatingModel.FinacialFormBillingMaxLimit,
  VrFinancialFormOnNatureOfServices:
    vendor.rating.averageVendorRatingModel.FinancialFormOnNatureOfServices,
  VrFinancialFormOnTypes:
    vendor.rating.averageVendorRatingModel.FinancialFormOnTypes,
  VrvendorDetails: vendor.vendorDetails.details,
  CReviewerRemarks: vendor.categorization.notificationData.ReviewerRemarks,
  CReviewers: vendor.categorization.notificationData.Reviewers,
  VdVendorName: vendor.vendorName,
}));

export const selectVendorDetailsForm = createSelector(
  [selectVendor],
  (vendor) => ({
    FormData: vendor.details.FormData,
    IsActive: vendor.details.IsActive,
    URN: vendor.details.URN,
    InActivationDate: vendor.details.InActivationDate,
    ReasonOfInactivation: vendor.details.ReasonOfInactivation,
    InActivationEvidence: vendor.details.InActivationEvidence,
    isInViewMode: vendor.editAccess.isInViewMode,
    vendorId: vendor.vendorId,
    isCentrilized: vendor.isUserCentrilized,
  })
);

export const selectVendorCategorization = createSelector(
  [selectVendor],
  (vendor) => ({
    vendorType: vendor.vendorType,
    dataa: vendor.categorization.data,
    isLoading: vendor.categorization.loading,
    gtScore: vendor.categorization.gtScore,
    scoreRating: vendor.categorization.gtScore,
    vendorId: vendor.vendorId,
    isInViewMode: vendor.editAccess.isInViewMode,
    vendorId: vendor.vendorId,
    isCentrilized: vendor.isUserCentrilized,
    ReviewerRemarks: vendor.categorization.notificationData.ReviewerRemarks,
    LastReviewSentOn: vendor.categorization.notificationData.LastReviewSentOn,
    Reviewers: vendor.categorization.notificationData.Reviewers,
  })
);

export const selectVendorAdditionalDetails = createSelector(
  [selectVendor],
  (vendor) => ({
    FilledFormJson: vendor.additionalDetails.FilledFormJson,
    isInViewMode: vendor.editAccess.isInViewMode,
    vendorId: vendor.vendorId,
    isCentrilized: vendor.isUserCentrilized,
  })
);

export const selectVendorRating = createSelector([selectVendor], (vendor) => ({
  vendorType: vendor.vendorType,
  vendorId: vendor.vendorId,
  ratingData: vendor.rating.ratingData,
  isInViewMode: vendor.editAccess.isInViewMode,
  VrDevaitions: vendor.rating.averageVendorRatingModel.Devaitions,
  vendorDetails: vendor.vendorDetails.details,
  VrFileStream: vendor.rating.averageVendorRatingModel.FileStream,
  VrTotalScore: vendor.rating.averageVendorRatingModel.TotalScore,
  VrConculusion: vendor.rating.averageVendorRatingModel.Conculusion,
  VrMaxVendorRatingScore:
    vendor.rating.averageVendorRatingModel.MaxVendorRatingScore,
  VrFinancialList: vendor.rating.financialForm.FinancialList,
  VrvendorRatingFinancialInfoReadModel:
    vendor.rating.financialForm.vendorRatingFinancialInfoReadModel,
  VrelligibleScore: vendor.rating.elligibleScore,
  VrElligibleLevel: vendor.rating.elligibleScoreStatus.level,
  VrElligibleColor: vendor.rating.elligibleScoreStatus.color,
  VrElligibilityScore: vendor.rating.elligibleScoreStatus.score,
  VrFinacialFormBillingMaxLimit:
    vendor.rating.averageVendorRatingModel.FinacialFormBillingMaxLimit,
  VrFinancialFormOnNatureOfServices:
    vendor.rating.averageVendorRatingModel.FinancialFormOnNatureOfServices,
  VrFinancialFormOnTypes:
    vendor.rating.averageVendorRatingModel.FinancialFormOnTypes,
  VrvendorDetails: vendor.vendorDetails.details,
}));

export const selectReview = createSelector([selectVendor], (vendor) => ({
  vendorId: vendor.vendorId,
  isInViewMode: vendor.editAccess.isInViewMode,
  isCentrilized: vendor.isUserCentrilized,
}));
export default vendorSlice.reducer;
