import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  useEffect(() => {
    fetchFeedback();
  }, []);
  const fetchFeedback = () => {
    try {
      const storedFeedback = localStorage.getItem('feedback');
      if (storedFeedback) {
        const data = JSON.parse(storedFeedback);
        setFeedback(data.sort((a, b) => b.id - a.id));
      } else {
        setFeedback([]);
      }
    } catch (error) {
      console.error('Erro ao carregar feedback do localStorage:', error);
      setFeedback([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    try {
      localStorage.setItem('feedback', JSON.stringify(feedback));
    } catch (error) {
      console.error('Erro ao salvar feedback no localStorage:', error);
    }
  }, [feedback]);
  const addFeedback = (newFeedback) => {
    setIsLoading(true);
    try {
      const id = Date.now().toString();
      const data = { ...newFeedback, id };
      setFeedback([data, ...feedback]);
    } catch (error) {
      console.error('Erro ao adicionar feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteFeedback = (id) => {
    if (window.confirm('Tem certeza que quer excluir?')) {
      setIsLoading(true);
      try {
        setFeedback(feedback.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Erro ao excluir feedback:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const updateFeedback = (id, updItem) => {
    setIsLoading(true);
    try {
      setFeedback(
        feedback.map((item) =>
          item.id === id ? { ...item, ...updItem } : item
        )
      );
      setFeedbackEdit({
        item: {},
        edit: false,
      });
    } catch (error) {
      console.error('Erro ao atualizar feedback:', error);
    } finally {
      setIsLoading(false);
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
