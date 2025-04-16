"use client"

import Input from '@/components/form/input/InputField';
import Select from '@/components/form/Select';
import Button from '@/components/ui/button/Button';
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/useModal';
import { IDomEditor } from '@wangeditor-next/editor';
import dynamic from 'next/dynamic';
import {useState} from 'react'

const WangEditor = dynamic(() => import("@/components/WYSIWYGEditor"), {
  ssr: false,
});

interface Question {
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correctOption: 'a' | 'b' | 'c' | 'd' | undefined;
}

const correctAnswerOptions = [
  {value: 'a', label: 'A'},
  {value: 'b', label: 'B'},
  {value: 'c', label: 'C'},
  {value: 'd', label: 'D'},
]

const CreateQuestion = () => {
    const { isOpen, openModal, closeModal } = useModal();
  const [question, setQuestion] = useState('');
  const [editorState, setEditorState] = useState<IDomEditor | null>(null);
  const [options, setOptions] = useState({
    a: '',
    b: '',
    c: '',
    d: '',
  });
  const [correctOption, setCorrectOption] = useState<'a' | 'b' | 'c' | 'd' | undefined>(undefined);
  const [questions, setQuestions] = useState<Question[]>([]);

  // const handleQuestionChange = (e: string) => {
  //   setQuestion(e);
  // };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, option: 'a' | 'b' | 'c' | 'd') => {
    setOptions((prevOptions) => ({ ...prevOptions, [option]: e.target.value }));
  };


  const handleCorrectOptionChange = (e: string) => {
    setCorrectOption(e as 'a' | 'b' | 'c' | 'd');
  };


  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newQuestion: Question = {
      question,
      options,
      correctOption,
    };
    setQuestions([...questions, newQuestion]);
    setQuestion('');
    setOptions({
      a: '',
      b: '',
      c: '',
      d: '',
    });
    setCorrectOption(undefined)
    closeModal()
  };

  return (
    <div className='w-full mx-auto p-4'>
              <div className='flex justify-end'>
          <Button onClick={openModal}>Create Question</Button>
        </div>
      <Modal 
      isOpen={isOpen}
                onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
      <WangEditor
                        editorState={editorState}
                        setEditorState={setEditorState}
                      
                      />
        <h2 className="mb-2">Options:</h2>
        <div className="flex flex-col mb-2">
          <label className="mb-1">
            A:
            <Input type='text' 
            defaultValue={options.a} 
            onChange={(e) => handleOptionChange(e, 'a')} />
          </label>
          <label className="mb-1">
            B:
            <Input
              type="text"
              defaultValue={options.b}
              onChange={(e) => handleOptionChange(e, 'b')}
            />
          </label>
          <label className="mb-1">
            C:
            <Input
              type="text"
              defaultValue={options.c}
              onChange={(e) => handleOptionChange(e, 'c')}
            />
          </label>
          <label className="mb-1">
            D:
            <Input
              type="text"
              defaultValue={options.d}
              onChange={(e) => handleOptionChange(e, 'd')}
            />
          </label>
        </div>
        <label className="mb-2">
          Correct Option:
          <Select options={correctAnswerOptions} 
          placeholder='Select Correct Option' 
          onChange={handleCorrectOptionChange}     
             className="bg-gray-50 dark:bg-gray-800 cursor-pointer"/>
        </label>
        <Button>       
             Create Question</Button>
        </form>
        </Modal>
      <h2 className="text-2xl font-bold mb-4 mt-4">Created Questions:</h2>
      <ol className='list-decimal'>
        {questions.map((question, index) => (
          <li key={index} className="mb-4">
            <div className="text-lg" dangerouslySetInnerHTML={{ __html: question.question }} />
            <h4 className="text-md font-bold">Options:</h4>
            <ul>
              <li>
                A: {question.options.a}
              </li>
              <li>
                B: {question.options.b}
              </li>
              <li>
                C: {question.options.c}
              </li>
              <li>
                D: {question.options.d}
              </li>
            </ul>
            <p>
              Correct Option: {question.correctOption}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default CreateQuestion
