export const submitUserData = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/submit-user-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server returned error:", errorText);
        return { message: "Submission failed" };
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("API Error:", error);
      return { message: "Submission failed" };
    }
  };
  