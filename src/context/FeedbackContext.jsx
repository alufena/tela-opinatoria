import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  const isProduction = window.location.hostname !== 'localhost';
  useEffect(() => {
    fetchFeedback();
  }, []);
  const fetchFeedback = async () => {
    if (isProduction) {
      const storedFeedback = localStorage.getItem('feedback');
      if (storedFeedback) {
        const data = JSON.parse(storedFeedback);
        setFeedback(data.sort((a, b) => b.id - a.id));
      } else {
        setFeedback([]);
      }
      setIsLoading(false);
    } else {
      try {
        const response = await fetch('/feedback?_sort=id&_order=desc');
        const data = await response.json();
        localStorage.setItem('feedback', JSON.stringify(data));
        setFeedback(data);
        setIsLoading(false);
      } catch (error) {
        console.error(
          'Erro ao carregar do json-server, usando localStorage:',
          error
        );
        const storedFeedback = localStorage.getItem('feedback');
        if (storedFeedback) {
          setFeedback(JSON.parse(storedFeedback));
        }
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    if (feedback.length > 0) {
      localStorage.setItem('feedback', JSON.stringify(feedback));
    }
  }, [feedback]);
  const addFeedback = async (newFeedback) => {
    setIsLoading(true);
    if (isProduction) {
      const id = Date.now().toString();
      const data = { ...newFeedback, id };
      setFeedback([data, ...feedback]);
      setIsLoading(false);
    } else {
      try {
        const response = await fetch('/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newFeedback),
        });
        const data = await response.json();
        setFeedback([data, ...feedback]);
      } catch (error) {
        console.error(
          'Erro ao adicionar no json-server, usando localStorage:',
          error
        );
        const id = Date.now().toString();
        const data = { ...newFeedback, id };
        setFeedback([data, ...feedback]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const deleteFeedback = async (id) => {
    if (window.confirm('Tem certeza que quer excluir?')) {
      setIsLoading(true);
      if (isProduction) {
        setFeedback(feedback.filter((item) => item.id !== id));
        setIsLoading(false);
      } else {
        try {
          await fetch(`/feedback/${id}`, { method: 'DELETE' });
          setFeedback(feedback.filter((item) => item.id !== id));
        } catch (error) {
          console.error(
            'Erro ao excluir do json-server, usando localStorage:',
            error
          );
          setFeedback(feedback.filter((item) => item.id !== id));
        } finally {
          setIsLoading(false);
        }
      }
    }
  };
  const updateFeedback = async (id, updItem) => {
    setIsLoading(true);
    if (isProduction) {
      setFeedback(
        feedback.map((item) =>
          item.id === id ? { ...item, ...updItem } : item
        )
      );
      setFeedbackEdit({
        item: {},
        edit: false,
      });
      setIsLoading(false);
    } else {
      try {
        const response = await fetch(`/feedback/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updItem),
        });
        const data = await response.json();
        setFeedback(
          feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
        );
        setFeedbackEdit({
          item: {},
          edit: false,
        });
      } catch (error) {
        console.error(
          'Erro ao atualizar no json-server, usando localStorage:',
          error
        );
        setFeedback(
          feedback.map((item) =>
            item.id === id ? { ...item, ...updItem } : item
          )
        );
        setFeedbackEdit({
          item: {},
          edit: false,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
