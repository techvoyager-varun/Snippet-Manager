import SnippetForm from '../components/snippets/SnippetForm';

const CreateSnippetPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Code Snippet</h1>
        <SnippetForm isEdit={false} />
      </div>
    </div>
  );
};

export default CreateSnippetPage;