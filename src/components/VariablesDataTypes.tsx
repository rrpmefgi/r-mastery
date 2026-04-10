import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Layout, Code, Terminal, ChevronRight, BookOpen, Info, Zap, Lightbulb } from 'lucide-react';
import { VARIABLES_DATA_TYPES_DATA } from '../data/variablesDataTypes';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

interface VariablesDataTypesProps {
  setActiveView: (view: any) => void;
}

export default function VariablesDataTypes({ setActiveView }: VariablesDataTypesProps) {
  const [view, setView] = useState<'main' | 'sub-list' | 'detail'>('main');
  const [subType, setSubType] = useState<'variables' | 'dataTypes' | 'dataStructures' | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [exampleLevel, setExampleLevel] = useState<1 | 2>(1);
  
  const [variables, setVariables] = useState<any[]>([]);
  const [dataTypes, setDataTypes] = useState<any[]>([]);
  const [dataStructures, setDataStructures] = useState<any[]>([]);

  useEffect(() => {
    const unsubVar = onSnapshot(collection(db, 'variables'), (snap) => {
      setVariables(snap.docs.map(doc => ({ ...doc.data(), docId: doc.id })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'variables'));

    const unsubDT = onSnapshot(collection(db, 'data_types'), (snap) => {
      setDataTypes(snap.docs.map(doc => ({ ...doc.data(), docId: doc.id })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'data_types'));

    const unsubDS = onSnapshot(collection(db, 'data_structures'), (snap) => {
      setDataStructures(snap.docs.map(doc => ({ ...doc.data(), docId: doc.id })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'data_structures'));

    return () => {
      unsubVar();
      unsubDT();
      unsubDS();
    };
  }, []);

  const handleBack = () => {
    if (view === 'detail') {
      setView('sub-list');
      setSelectedItem(null);
      setExampleLevel(1);
    } else if (view === 'sub-list') {
      setView('main');
      setSubType(null);
    } else {
      setActiveView('lessons');
    }
  };

  const getSubList = () => {
    if (subType === 'variables') return variables.length > 0 ? variables : VARIABLES_DATA_TYPES_DATA.variables;
    if (subType === 'dataTypes') return dataTypes.length > 0 ? dataTypes : VARIABLES_DATA_TYPES_DATA.dataTypes;
    if (subType === 'dataStructures') return dataStructures.length > 0 ? dataStructures : VARIABLES_DATA_TYPES_DATA.dataStructures;
    return [];
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 bg-white brutal-border px-4 py-2 brutal-shadow hover:bg-brutal-yellow transition-colors font-black uppercase text-sm"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <div className="text-right">
            <h1 className="text-4xl font-black uppercase tracking-tighter italic">
              {view === 'main' ? 'Variables & Data Types' : 
               (subType === 'variables' ? '1. Variable' : 
                subType === 'dataTypes' ? '2. Data Type' : '3. Common Data Structures')}
            </h1>
            {selectedItem && <p className="text-brutal-pink font-bold uppercase text-sm">{selectedItem.name}</p>}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Main Menu */}
          {view === 'main' && (
            <motion.div 
              key="main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <button 
                onClick={() => { setSubType('variables'); setView('sub-list'); }}
                className="bg-brutal-blue text-white brutal-border p-8 brutal-shadow-lg brutal-3d text-center group"
              >
                <div className="w-16 h-16 bg-white text-black mx-auto mb-6 brutal-border flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Layout size={32} />
                </div>
                <h2 className="text-2xl font-black uppercase mb-4">1. Variable</h2>
                <p className="font-bold opacity-80 uppercase text-xs">Variables, Objects, and Identifiers.</p>
              </button>

              <button 
                onClick={() => { setSubType('dataTypes'); setView('sub-list'); }}
                className="bg-brutal-pink text-white brutal-border p-8 brutal-shadow-lg brutal-3d text-center group"
              >
                <div className="w-16 h-16 bg-white text-black mx-auto mb-6 brutal-border flex items-center justify-center group-hover:-rotate-12 transition-transform">
                  <Code size={32} />
                </div>
                <h2 className="text-2xl font-black uppercase mb-4">2. Data Type</h2>
                <p className="font-bold opacity-80 uppercase text-xs">Numeric, Integer, Character, Logical, etc.</p>
              </button>

              <button 
                onClick={() => { setSubType('dataStructures'); setView('sub-list'); }}
                className="bg-brutal-green text-white brutal-border p-8 brutal-shadow-lg brutal-3d text-center group"
              >
                <div className="w-16 h-16 bg-white text-black mx-auto mb-6 brutal-border flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Terminal size={32} />
                </div>
                <h2 className="text-2xl font-black uppercase mb-4">3. Common Data Structures</h2>
                <p className="font-bold opacity-80 uppercase text-xs">Vectors, Lists, Matrices, Data Frames, etc.</p>
              </button>
            </motion.div>
          )}

          {/* Sub-list View */}
          {view === 'sub-list' && (
            <motion.div 
              key="sub-list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {getSubList().map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => { setSelectedItem(item); setView('detail'); }}
                  className="bg-white brutal-border p-6 brutal-shadow hover:translate-x-1 hover:-translate-y-1 transition-transform text-left group flex justify-between items-center"
                >
                  <span className="text-xl font-black uppercase">{item.name}</span>
                  <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </button>
              ))}
            </motion.div>
          )}

          {/* Detail View */}
          {view === 'detail' && selectedItem && (
            <motion.div 
              key="detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              {/* Definition Section */}
              <section className="bg-brutal-yellow brutal-border p-8 brutal-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen size={24} />
                  <h2 className="text-2xl font-black uppercase italic">Definition</h2>
                </div>
                <p className="text-lg font-bold leading-relaxed">{selectedItem.definition}</p>
              </section>

              {/* Explanation Section */}
              <section className="bg-white brutal-border p-8 brutal-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <Info size={24} />
                  <h2 className="text-2xl font-black uppercase italic">Explanation</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="font-bold text-gray-700 whitespace-pre-line">{selectedItem.explanation}</p>
                  </div>
                  <div className="bg-black text-white p-6 brutal-border font-mono text-sm">
                    <div className="text-brutal-green mb-2 uppercase text-xs font-black tracking-widest">Syntax Guide</div>
                    {selectedItem.explanation?.split('Syntax:')[1] || 'Syntax provided in explanation.'}
                  </div>
                </div>
              </section>

              {/* Example Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Zap size={24} />
                  <h2 className="text-2xl font-black uppercase italic">Example</h2>
                </div>
                
                <div className="flex gap-4 mb-8">
                  <button 
                    onClick={() => setExampleLevel(1)}
                    className={`flex-1 p-4 brutal-border brutal-shadow font-black uppercase transition-all ${exampleLevel === 1 ? 'bg-brutal-blue text-white' : 'bg-white hover:bg-gray-50'}`}
                  >
                    1. First Level (Easy)
                  </button>
                  <button 
                    onClick={() => setExampleLevel(2)}
                    className={`flex-1 p-4 brutal-border brutal-shadow font-black uppercase transition-all ${exampleLevel === 2 ? 'bg-brutal-pink text-white' : 'bg-white hover:bg-gray-50'}`}
                  >
                    2. Second Level (Hard)
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-black text-white p-8 brutal-border brutal-shadow-white">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-gray-400">R Code</span>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                    </div>
                    <pre className="font-mono text-lg text-brutal-green overflow-x-auto">
                      {exampleLevel === 1 ? selectedItem.firstLevel.code : selectedItem.secondLevel.code}
                    </pre>
                  </div>

                  <div className="bg-gray-100 brutal-border p-8 brutal-shadow">
                    <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Console Output</div>
                    <pre className="font-mono text-lg text-black overflow-x-auto">
                      {exampleLevel === 1 ? selectedItem.firstLevel.output : selectedItem.secondLevel.output}
                    </pre>
                  </div>
                </div>
              </section>

              {/* Explain Example Section */}
              <section className="bg-brutal-green text-white brutal-border p-8 brutal-shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={24} />
                  <h2 className="text-2xl font-black uppercase italic">Explain Example</h2>
                </div>
                <p className="text-lg font-bold italic">
                  {exampleLevel === 1 ? selectedItem.firstLevel.explanation : selectedItem.secondLevel.explanation}
                </p>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
