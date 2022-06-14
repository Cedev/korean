
const by = f => (a, b) => {
  const fa = f(a);
  const fb = f(b);
  if (fa < fb) {
    return -1;
  } else if (fa > fb) {
    return 1;
  } else if (fa == fb) {
    return 0;
  }
}

export function Speak({signal, lang, children, ...props}) {

  const sig = signal()
  console.log("Speak");
  console.log(sig);
  if (sig) {
    console.log("Uttering");
    const utterance = new SpeechSynthesisUtterance(children);

    const voices = window.speechSynthesis.getVoices();
    const langVoices = voices.filter(x => x.lang == lang);
    langVoices.sort(by(x=> x.name.startsWith("Google")));
    utterance.voice = langVoices[langVoices.length - 1];
    console.log(utterance.voice);

    Object.assign(utterance, props);
    Object.assign(utterance, sig);
    console.log(utterance);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return null;
}
