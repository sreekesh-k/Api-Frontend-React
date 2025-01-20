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

const vendorReducer = (state = vendor, action) => {
  switch (action.type) {
    case "CHANGE_TAB":
      return {
        ...state,
        vendor: { ...state, activeTab: action.payload },
      };

    case "SAVE_VENDOR_ID":
      return {
        ...state,
        vendor: { ...state, vendorId: action.payload },
      };

    case "CHANGE_VENDOR_DETAILS":
      const { vendorType, vendorDepartment } = action.payload;
      return {
        ...state,
        vendor: { ...state, vendorType, vendorDepartment },
      };

    case "UPDATE_RATING_DATA":
      return {
        ...state,
        vendor: { ...state, vendorData: action.payload.vendorData },
      };

    case "UPDATE_CATEGORIZATION_DATA":
      return {
        ...state,
        vendor: {
          ...state,
          categorization: {
            ...state.categorization,
            data: action.payload,
          },
        },
      };

    case "UPDATE_SAVING_CATEGORIZATION_DATA":
      return {
        ...state,
        vendor: {
          ...state,
          categorization: {
            ...state.categorization,
            saveData: action.payload,
          },
        },
      };

    case "SAVE_CATEGORIZATION_DATA":
      return state; // This case currently does nothing, so it's unchanged.

    case "CHANGE_VENOR_DETAILS_FORM":
      const { FormData, IsActive, URN, Type } = action.payload;
      return {
        ...state,
        vendor: {
          ...state,
          details: {
            ...state.details,
            FormData,
            Type,
            ...(IsActive !== undefined && { IsActive }),
            ...(URN !== undefined && { URN }),
          },
        },
      };

    case "SET_URN":
      return {
        ...state,
        vendor: {
          ...state,
          details: { ...state.details, URN: action.payload.URN },
        },
      };

    case "SET_IS_ACTIVE":
      const { IsActive: isActiveStatus } = action.payload;
      return {
        ...state,
        vendor: {
          ...state,
          details: {
            ...state.details,
            IsActive: isActiveStatus,
            ...(isActiveStatus && {
              InActivationDate: "",
              ReasonOfInactivation: "",
              InActivationEvidence: "",
            }),
          },
        },
      };

    case "SET_INACTIVATION":
      const { InActivationDate, ReasonOfInactivation, InActivationEvidence } =
        action.payload;
      return {
        ...state,
        vendor: {
          ...state,
          details: {
            ...state.details,
            ...(InActivationDate !== undefined && { InActivationDate }),
            ...(ReasonOfInactivation !== undefined && { ReasonOfInactivation }),
            ...(InActivationEvidence !== undefined && { InActivationEvidence }),
          },
        },
      };

    case "ADDITIONAL_DETAILS_FORM":
      return {
        ...state,
        vendor: {
          ...state,
          additionalDetails: {
            ...state.additionalDetails,
            FilledFormJson: action.payload.FilledFormJson,
          },
        },
      };

    case "SET_REVIEW":
      return {
        ...state,
        vendor: {
          ...state,
          review: {
            ...state.review,
            StageJson: action.payload.StageJson,
          },
        },
      };

    case "SET_VENDOR_RATING":
      return {
        ...state,
        vendor: {
          ...state,
          rating: {
            ...state.rating,
            ratingData: action.payload.ratingData,
          },
        },
      };

    case "UPDATE_EDIT_ACCESS":
      localStorage.setItem(
        "isViewMode",
        JSON.stringify(!!action.payload.isInViewMode)
      );
      return {
        ...state,
        vendor: {
          ...state,
          editAccess: {
            ...state.editAccess,
            isInViewMode: action.payload.isInViewMode,
          },
        },
      };

    case "UPDATE_SAVING_RATING_DATA":
      return {
        ...state,
        vendor: {
          ...state,
          rating: { ...state.rating, ratingSaveData: action.payload },
        },
      };

    case "UPDATE_VENDOR_RATING_MODEL":
      return {
        ...state,
        vendor: {
          ...state,
          rating: {
            ...state.rating,
            averageVendorRatingModel: {
              ...state.rating.averageVendorRatingModel,
              ...action.payload,
            },
          },
        },
      };

    case "UPDATE_RATING_FINANCIAL_FORM":
      return {
        ...state,
        vendor: {
          ...state,
          rating: {
            ...state.rating,
            financialForm: { ...action.payload },
          },
        },
      };

    case "UPDATE_RATING_ELLIGIBLE_SCORE":
      return {
        ...state,
        vendor: {
          ...state,
          rating: {
            ...state.rating,
            elligibleScore: action.payload.elligibleScore,
          },
        },
      };

    case "UPDATE_RATING_ELLIGIBLE_SCORE_STATUS":
      const { level, color, score } = action.payload;
      return {
        ...state,
        vendor: {
          ...state,
          rating: {
            ...state.rating,
            elligibleScoreStatus: { level, color, score },
          },
        },
      };

    case "CATEGORIZATION_NOTIFICATION_DATA":
      const { ReviewerRemarks, LastReviewSentOn, Reviewers } =
        action.payload[0];
      return {
        ...state,
        vendor: {
          ...state,
          categorization: {
            ...state.categorization,
            notificationData: { ReviewerRemarks, LastReviewSentOn, Reviewers },
          },
        },
      };

    case "CHANGE_CATEG_REVIEW":
      return {
        ...state,
        vendor: {
          ...state,
          categorization: {
            ...state.categorization,
            notificationData: {
              ...state.categorization.notificationData,
              ReviewerRemarks: action.payload,
            },
          },
        },
      };

    case "CHANGE_CATEG_REVIEWRS":
      return {
        ...state,
        vendor: {
          ...state,
          categorization: {
            ...state.categorization,
            notificationData: {
              ...state.categorization.notificationData,
              Reviewers: action.payload,
            },
          },
        },
      };

    case "CHANGE_VENDOR_NAME":
      return {
        ...state,
        vendor: { ...state, vendorName: action.payload },
      };

    default:
      return state;
  }
};
const store = createStore(vendorReducer);

export default store;
//store.unsubscribe()
