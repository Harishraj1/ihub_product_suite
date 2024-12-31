import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectInput = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  // Form submission handler
  const onSubmit = async (data) => {
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('title', data.name);
    formData.append('description', data.description);
    formData.append('image', data.image[0]);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/submit/', {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(`Project saved successfully! ID: ${responseData.id}`);
        reset();
        setImagePreview(null);
      } else {
        toast.error(responseData.error || 'Failed to save project');
      }
    } catch (error) {
      toast.error('Error: Could not save project.');
      console.error('API call error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Image preview handler
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Modern styling with inline CSS
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f6f9fc 0%, #edf2f7 100%)',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formWrapper: {
      width: '100%',
      maxWidth: '800px',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '24px',
      padding: '3rem',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
      backdropFilter: 'blur(10px)',
    },
    title: {
      fontSize: '2.5rem',
      background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
      marginBottom: '2.5rem',
      fontWeight: '700',
    },
    inputGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '0.75rem',
    },
    input: {
      width: '100%',
      padding: '1rem',
      fontSize: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      backgroundColor: 'white',
      transition: 'all 0.3s ease',
      outline: 'none',
    },
    textarea: {
      width: '100%',
      padding: '1rem',
      fontSize: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      backgroundColor: 'white',
      minHeight: '150px',
      resize: 'vertical',
      transition: 'all 0.3s ease',
    },
    imageUploadButton: {
      padding: '1rem 1.5rem',
      backgroundColor: '#f8fafc',
      border: '2px dashed #e2e8f0',
      borderRadius: '12px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      color: '#64748b',
      fontWeight: '500',
      '&:hover': {
        backgroundColor: '#f1f5f9',
        borderColor: '#3b82f6',
        color: '#3b82f6',
      },
    },
    imagePreview: {
      width: '80px',
      height: '80px',
      borderRadius: '12px',
      objectFit: 'cover',
      marginLeft: '1rem',
    },
    submitButton: {
      padding: '1rem 2rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    submitButtonHover: {
      backgroundColor: '#2563eb',
      transform: 'translateY(-1px)',
    },
    submitButtonDisabled: {
      backgroundColor: '#93c5fd',
      cursor: 'not-allowed',
      transform: 'none',
    },
    errorText: {
      color: '#ef4444',
      fontSize: '0.875rem',
      marginTop: '0.5rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Create New Project</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>Project Name</label>
            <input
              type="text"
              id="name"
              {...register('name', { 
                required: 'Project name is required',
                minLength: {
                  value: 3,
                  message: 'Project name must be at least 3 characters'
                }
              })}
              style={styles.input}
              placeholder="Enter your project name"
            />
            {errors.name && (
              <p style={styles.errorText}>{errors.name.message}</p>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="description" style={styles.label}>Description</label>
            <textarea
              id="description"
              {...register('description', { 
                required: 'Description is required',
                minLength: {
                  value: 10,
                  message: 'Description must be at least 10 characters'
                }
              })}
              style={styles.textarea}
              placeholder="Describe your project"
            />
            {errors.description && (
              <p style={styles.errorText}>{errors.description.message}</p>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="image" style={styles.label}>Project Image</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="file"
                id="image"
                accept="image/*"
                {...register('image', { required: 'Project image is required' })}
                onChange={(e) => {
                  handleImagePreview(e);
                  register('image').onChange(e);
                }}
                style={{ display: 'none' }}
              />
              <label htmlFor="image" style={styles.imageUploadButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
                Upload Image
              </label>
              {imagePreview && (
                <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
              )}
            </div>
            {errors.image && (
              <p style={styles.errorText}>{errors.image.message}</p>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.submitButton,
                ...(isLoading ? styles.submitButtonDisabled : {}),
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor;
                  e.target.style.transform = styles.submitButtonHover.transform;
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = styles.submitButton.backgroundColor;
                  e.target.style.transform = 'none';
                }
              }}
            >
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Create Project'
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ProjectInput;