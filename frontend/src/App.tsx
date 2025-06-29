import { useState } from "react";
import { Upload, FileText, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [menuItems, setMenuItems] = useState<{name: string, url: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  
  const handleFileChange = (event : any) => {
    setSelectedFile(event.target.files[0]);
    setMenuItems([]);
    setHasUploaded(false);
  };

  const handleClick = async (event : any) => {
    event.preventDefault();
    if (!selectedFile) return;
    
    setIsLoading(true);
    try {
      const response = await handleFileUpload(selectedFile);
      setMenuItems(response || []);
      setHasUploaded(true);
    } catch (error) {
      console.error("Upload failed:", error);
      setMenuItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file : any) => {
    if (!file) return [];

    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const response = await axios.post(`${BACKEND_URL}/upload`, formData);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error("There was an error: ", e);
      throw e;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Restaurant Menu Visualizer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload your menu image to extract and visualize menu items
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="file-upload" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Upload Menu File
              </label>
              <div className="relative">
                <input 
                  id="file-upload"
                  type="file" 
                  className="w-full text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white dark:file:bg-gray-600 file:cursor-pointer" 
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
                <Upload className="absolute right-4 top-4 h-6 w-6 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
              onClick={handleClick}
              disabled={!selectedFile || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  <span>Extract Menu Items</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {hasUploaded && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Extracted Menu Items
              </h2>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                {menuItems.length} items found
              </span>
            </div>

            {menuItems.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {menuItems.map((item, index) => (
                  <div 
                    key={index}
                    className="group bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:scale-[1.02]"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 bg-gray-100 dark:bg-gray-600 overflow-hidden">
                      {item ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                          <div className="text-center">
                            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                              Image unavailable
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Overlay with external link */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                          title="View full image"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No menu items were found in the uploaded file.
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                  Please try uploading a different image or check the file format.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;