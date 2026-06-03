import { useEffect, useState } from "react";

function isAppInstalled() {
  return window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone;
}

function getInstallHelpMessage() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isIos = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);

  if (isAppInstalled()) {
    return "O app já está instalado neste dispositivo.";
  }

  if (isIos) {
    return "No iPhone/iPad, toque em Compartilhar e depois em Adicionar à Tela de Início.";
  }

  if (isAndroid) {
    return "No Android, abra o menu do navegador e toque em Instalar app ou Adicionar à tela inicial.";
  }

  return "No Chrome ou Edge desktop, use o ícone de instalar na barra de endereço ou o menu do navegador.";
}

export function useInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [installed, setInstalled] = useState(() => (typeof window === "undefined" ? false : isAppInstalled()));

  useEffect(() => {
    const onBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setPromptEvent(event);
      setInstalled(false);
    };

    const onInstalled = () => {
      setInstalled(true);
      setPromptEvent(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (!promptEvent) {
      window.alert(getInstallHelpMessage());
      return;
    }

    promptEvent.prompt();
    await promptEvent.userChoice;
    setPromptEvent(null);
  };

  return {
    canInstall: Boolean(promptEvent) && !installed,
    installed,
    install
  };
}
