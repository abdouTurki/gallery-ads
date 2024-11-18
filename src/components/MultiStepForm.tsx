import React, { useState } from 'react';
import { useFormik, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

interface FormValues {
    brandName: string;
    brandWebsite: string;
    campaignName: string;
    campaignGoal: string;
    creativeBrief: string;
    selectedMedia: string[];
}

const MultiStepForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);

    const formik = useFormik<FormValues>({
        initialValues: {
            brandName: '',
            brandWebsite: '',
            campaignName: '',
            campaignGoal: 'Maximize Conversions',
            creativeBrief: '',
            selectedMedia: [],
        },
        validationSchema: Yup.object({
            // Step 1 validations
            brandName: Yup.string().required('Brand Name is required'),
            brandWebsite: Yup.string()
                .url('Invalid URL')
                .required('Brand Website is required'),
            campaignName: Yup.string().required('Campaign Name is required'),
            creativeBrief: Yup.string().required('Creative Brief is required'),
            // Step 2 validations
            selectedMedia: Yup.array().min(1, 'At least one media item must be selected.'),
        }),
        onSubmit: (values) => {
            console.log('Workflow launched successfully!');
            console.log(values);
            alert('Workflow launched successfully!');
            // Optionally reset the form or redirect the user
        },
    });

    const handleNext = async () => {
        const fieldsToValidate: (keyof FormValues)[] =
            currentStep === 1
                ? ['brandName', 'brandWebsite', 'campaignName', 'creativeBrief']
                : ['selectedMedia'];

        // Validate the form
        await formik.validateForm();

        // Check for errors in the current step's fields
        const errors = formik.errors;
        const stepHasErrors = fieldsToValidate.some((field) => !!errors[field]);

        if (!stepHasErrors) {
            setCurrentStep(currentStep + 1);
        } else {
            // Mark the current step's fields as touched to display errors
            const touchedFields = fieldsToValidate.reduce((acc, field) => {
                acc[field] = true;
                return acc;
            }, {} as FormikTouched<FormValues>);

            formik.setTouched({ ...formik.touched, ...touchedFields });
        }
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
            {currentStep === 1 && <StepOne formik={formik} />}
            {currentStep === 2 && <StepTwo formik={formik} />}
            {currentStep === 3 && <StepThree formik={formik} />}
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
                {currentStep > 1 && (
                    <button
                        type="button"
                        onClick={handleBack}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Back
                    </button>
                )}
                {currentStep < 3 && (
                    <button
                        type="button"
                        onClick={handleNext}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Next
                    </button>
                )}
                {currentStep === 3 && (
                    <button
                        type="button"
                        onClick={formik.handleSubmit}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Launch Workflow
                    </button>
                )}
            </div>
        </div>
    );
};

export default MultiStepForm;
