
    async function addToFireStore(e){
        e.preventDefault();
    
        try {
    
            setLoading(true);
    
           
    
            
            const storageRef = ref(storage, `resumes/${upload.name}`);
            await uploadBytes(storageRef, upload);
        
            // Get download URL for the uploaded file
            const downloadURL = await getDownloadURL(storageRef);
        
            console.log("Resume uploaded successfully to Firebase Storage");
            setUploadUrl(downloadURL) ;
    
    
    
            await setDoc(doc(db, "Applications", currentTimestamp), {
            //     job:title,
            //    firstname:firstname,
            //    lastname:lastname,
            //    email:email,
            //    phone:phone,
            //    resume:downloadURL,

    
              });
    
              console.log("Record Added Successfully");
    
              setLoading(false);
           
    
             setFirstName("");
             setLastName("");
             
             setUploadUrl("");
             setUpload(null);

    
              navigate('/');
    
             
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
            
            
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    
       
    
        //   setFirstName("");
        
    }